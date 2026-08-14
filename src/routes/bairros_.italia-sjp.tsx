import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/italia-sjp"];

export const Route = createFileRoute("/bairros_/italia-sjp")({
  component: RouteComponent,
});
