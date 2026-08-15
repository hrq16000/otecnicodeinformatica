import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-bela-vista-piraquara"];

export const Route = createFileRoute("/bairros_/jardim-bela-vista-piraquara")({
  component: RouteComponent,
});
