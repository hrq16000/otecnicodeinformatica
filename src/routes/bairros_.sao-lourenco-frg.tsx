import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-lourenco-frg"];

export const Route = createFileRoute("/bairros_/sao-lourenco-frg")({
  component: RouteComponent,
});
