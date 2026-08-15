import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/batel"];

export const Route = createFileRoute("/bairros_/batel")({
  component: RouteComponent,
});
