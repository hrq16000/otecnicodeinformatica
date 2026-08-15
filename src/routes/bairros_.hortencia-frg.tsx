import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/hortencia-frg"];

export const Route = createFileRoute("/bairros_/hortencia-frg")({
  component: RouteComponent,
});
