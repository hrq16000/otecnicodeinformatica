import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-laranjeiras-cl"];

export const Route = createFileRoute("/bairros_/jardim-laranjeiras-cl")({
  component: RouteComponent,
});
