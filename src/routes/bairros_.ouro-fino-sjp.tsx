import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/ouro-fino-sjp"];

export const Route = createFileRoute("/bairros_/ouro-fino-sjp")({
  component: RouteComponent,
});
