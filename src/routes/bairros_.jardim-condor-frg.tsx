import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-condor-frg"];

export const Route = createFileRoute("/bairros_/jardim-condor-frg")({
  component: RouteComponent,
});
