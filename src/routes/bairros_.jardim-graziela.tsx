import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-graziela"];

export const Route = createFileRoute("/bairros_/jardim-graziela")({
  component: RouteComponent,
});
