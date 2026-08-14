import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/status-os")({
  component: legacyRouteElements["/status-os"],
});
