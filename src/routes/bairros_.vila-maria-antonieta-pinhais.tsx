import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vila-maria-antonieta-pinhais")({
  component: legacyRouteElements["/bairros/vila-maria-antonieta-pinhais"],
});
