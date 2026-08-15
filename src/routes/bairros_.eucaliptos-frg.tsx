import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/eucaliptos-frg"];

export const Route = createFileRoute("/bairros_/eucaliptos-frg")({
  component: RouteComponent,
});
