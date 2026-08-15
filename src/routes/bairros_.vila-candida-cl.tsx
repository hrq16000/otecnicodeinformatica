import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vila-candida-cl"];

export const Route = createFileRoute("/bairros_/vila-candida-cl")({
  component: RouteComponent,
});
