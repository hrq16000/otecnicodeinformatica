import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/centro-quatro-barras")({
  component: legacyRouteElements["/bairros/centro-quatro-barras"],
});
