import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-planalto-campo-largo"];

export const Route = createFileRoute("/bairros_/jardim-planalto-campo-largo")({
  component: RouteComponent,
});
