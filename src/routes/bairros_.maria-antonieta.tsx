import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/maria-antonieta"];

export const Route = createFileRoute("/bairros_/maria-antonieta")({
  component: RouteComponent,
});
