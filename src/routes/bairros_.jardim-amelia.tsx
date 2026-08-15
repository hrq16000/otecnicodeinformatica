import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-amelia"];

export const Route = createFileRoute("/bairros_/jardim-amelia")({
  component: RouteComponent,
});
