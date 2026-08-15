import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/correia-de-freitas"];

export const Route = createFileRoute("/bairros_/correia-de-freitas")({
  component: RouteComponent,
});
