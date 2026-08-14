import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-cristovao"];

export const Route = createFileRoute("/bairros_/sao-cristovao")({
  component: RouteComponent,
});
