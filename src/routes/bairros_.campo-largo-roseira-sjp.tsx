import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/campo-largo-roseira-sjp"];

export const Route = createFileRoute("/bairros_/campo-largo-roseira-sjp")({
  component: RouteComponent,
});
