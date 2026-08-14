import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-america-campo-largo"];

export const Route = createFileRoute("/bairros_/jardim-america-campo-largo")({
  component: RouteComponent,
});
