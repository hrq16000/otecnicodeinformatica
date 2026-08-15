import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/wifi-instavel"];

export const Route = createFileRoute("/problemas_/wifi-instavel")({
  component: RouteComponent,
});
