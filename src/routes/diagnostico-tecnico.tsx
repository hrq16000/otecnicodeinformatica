import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/diagnostico-tecnico"];

export const Route = createFileRoute("/diagnostico-tecnico")({
  component: RouteComponent,
});
