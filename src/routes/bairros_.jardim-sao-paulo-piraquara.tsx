import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-sao-paulo-piraquara"];

export const Route = createFileRoute("/bairros_/jardim-sao-paulo-piraquara")({
  component: RouteComponent,
});
