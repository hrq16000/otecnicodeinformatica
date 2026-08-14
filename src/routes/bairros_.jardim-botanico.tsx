import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-botanico"];

export const Route = createFileRoute("/bairros_/jardim-botanico")({
  component: RouteComponent,
});
