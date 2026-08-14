import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-osasco"];

export const Route = createFileRoute("/bairros_/jardim-osasco")({
  component: RouteComponent,
});
