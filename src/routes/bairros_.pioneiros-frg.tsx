import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/pioneiros-frg"];

export const Route = createFileRoute("/bairros_/pioneiros-frg")({
  component: RouteComponent,
});
