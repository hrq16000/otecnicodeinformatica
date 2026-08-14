import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vila-amelia-pinhais")({
  component: legacyRouteElements["/bairros/vila-amelia-pinhais"],
});
