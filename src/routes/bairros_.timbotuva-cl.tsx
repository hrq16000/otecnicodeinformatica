import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/timbotuva-cl"];

export const Route = createFileRoute("/bairros_/timbotuva-cl")({
  component: RouteComponent,
});
