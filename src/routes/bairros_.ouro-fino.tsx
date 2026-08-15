import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/ouro-fino"];

export const Route = createFileRoute("/bairros_/ouro-fino")({
  component: RouteComponent,
});
