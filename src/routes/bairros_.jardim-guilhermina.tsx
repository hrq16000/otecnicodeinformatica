import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-guilhermina"];

export const Route = createFileRoute("/bairros_/jardim-guilhermina")({
  component: RouteComponent,
});
