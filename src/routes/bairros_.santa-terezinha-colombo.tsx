import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/santa-terezinha-colombo"];

export const Route = createFileRoute("/bairros_/santa-terezinha-colombo")({
  component: RouteComponent,
});
