import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/colonia-murici-sjp"];

export const Route = createFileRoute("/bairros_/colonia-murici-sjp")({
  component: RouteComponent,
});
