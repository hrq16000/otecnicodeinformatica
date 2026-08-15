import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/osvaldo-cruz-colombo"];

export const Route = createFileRoute("/bairros_/osvaldo-cruz-colombo")({
  component: RouteComponent,
});
