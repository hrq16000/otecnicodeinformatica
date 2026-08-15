import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/centro-almirante-tamandare"];

export const Route = createFileRoute("/bairros_/centro-almirante-tamandare")({
  component: RouteComponent,
});
