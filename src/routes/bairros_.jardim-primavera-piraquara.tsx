import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-primavera-piraquara"];

export const Route = createFileRoute("/bairros_/jardim-primavera-piraquara")({
  component: RouteComponent,
});
