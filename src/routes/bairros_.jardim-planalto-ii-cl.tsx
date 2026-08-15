import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-planalto-ii-cl"];

export const Route = createFileRoute("/bairros_/jardim-planalto-ii-cl")({
  component: RouteComponent,
});
