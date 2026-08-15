import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/cabral"];

export const Route = createFileRoute("/bairros_/cabral")({
  component: RouteComponent,
});
