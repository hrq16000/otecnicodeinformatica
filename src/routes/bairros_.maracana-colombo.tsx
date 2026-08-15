import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/maracana-colombo"];

export const Route = createFileRoute("/bairros_/maracana-colombo")({
  component: RouteComponent,
});
