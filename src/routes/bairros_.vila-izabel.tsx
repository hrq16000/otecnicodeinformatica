import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vila-izabel"];

export const Route = createFileRoute("/bairros_/vila-izabel")({
  component: RouteComponent,
});
