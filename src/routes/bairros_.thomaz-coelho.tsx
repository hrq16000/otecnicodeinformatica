import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/thomaz-coelho"];

export const Route = createFileRoute("/bairros_/thomaz-coelho")({
  component: RouteComponent,
});
