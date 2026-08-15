import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/iguacu-frg"];

export const Route = createFileRoute("/bairros_/iguacu-frg")({
  component: RouteComponent,
});
