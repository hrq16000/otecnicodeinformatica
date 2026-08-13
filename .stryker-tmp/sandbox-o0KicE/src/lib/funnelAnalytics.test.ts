// @ts-nocheck
import { describe, it, expect, beforeEach, vi } from "vitest";
import { track, trackFunnelOpen, trackFunnelSubmit } from "./funnelAnalytics";

declare global {
  // eslint-disable-next-line no-var
  var gtag: ((...a: unknown[]) => void) | undefined;
}

describe("funnelAnalytics", () => {
  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem(
      "utm_payload_v1",
      JSON.stringify({ utm_source: "google", utm_campaign: "test", gclid: "abc" }),
    );
    globalThis.gtag = vi.fn();
  });

  it("fires gtag with event_category=wa_funnel and merges UTMs", () => {
    track("custom_event", { foo: "bar" });
    expect(globalThis.gtag).toHaveBeenCalledWith(
      "event",
      "custom_event",
      expect.objectContaining({
        event_category: "wa_funnel",
        utm_source: "google",
        utm_campaign: "test",
        gclid: "abc",
        foo: "bar",
      }),
    );
  });

  it("trackFunnelOpen sends cta_location", () => {
    trackFunnelOpen("header", true);
    expect(globalThis.gtag).toHaveBeenCalledWith(
      "event",
      "wa_funnel_open",
      expect.objectContaining({ cta_location: "header", has_preset: true }),
    );
  });

  it("trackFunnelSubmit forwards params", () => {
    trackFunnelSubmit({ equipamento: "tv", sintoma: "nao-liga", requiresColeta: true, mediaCount: 2, ctaLocation: "cta" });
    expect(globalThis.gtag).toHaveBeenCalledWith(
      "event",
      "wa_funnel_submit",
      expect.objectContaining({ equipamento: "tv", requiresColeta: true, mediaCount: 2 }),
    );
  });

  it("does not throw when gtag is missing", () => {
    globalThis.gtag = undefined;
    expect(() => track("noop")).not.toThrow();
  });
});
