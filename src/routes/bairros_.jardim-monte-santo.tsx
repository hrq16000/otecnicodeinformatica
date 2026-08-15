import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-monte-santo"];

export const Route = createFileRoute("/bairros_/jardim-monte-santo")({
  component: RouteComponent,
});
