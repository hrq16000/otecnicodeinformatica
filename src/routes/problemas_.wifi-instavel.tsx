import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/wifi-instavel")({
  component: legacyRouteElements["/problemas/wifi-instavel"],
});
