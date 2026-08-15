import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/hugo-lange"];

export const Route = createFileRoute("/bairros_/hugo-lange")({
  component: RouteComponent,
});
