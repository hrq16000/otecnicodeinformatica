import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/barigui-araucaria"];

export const Route = createFileRoute("/bairros_/barigui-araucaria")({
  component: RouteComponent,
});
