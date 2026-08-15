import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/santa-terezinha-frg"];

export const Route = createFileRoute("/bairros_/santa-terezinha-frg")({
  component: RouteComponent,
});
