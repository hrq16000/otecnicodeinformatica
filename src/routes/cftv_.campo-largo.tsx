import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/cftv_/campo-largo")({
  component: legacyRouteElements["/cftv/campo-largo"],
});
