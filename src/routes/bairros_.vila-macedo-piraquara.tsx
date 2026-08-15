import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vila-macedo-piraquara"];

export const Route = createFileRoute("/bairros_/vila-macedo-piraquara")({
  component: RouteComponent,
});
