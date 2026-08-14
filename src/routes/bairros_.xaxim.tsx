import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/xaxim"];

export const Route = createFileRoute("/bairros_/xaxim")({
  component: RouteComponent,
});
