import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/thomaz-coelho-ii"];

export const Route = createFileRoute("/bairros_/thomaz-coelho-ii")({
  component: RouteComponent,
});
