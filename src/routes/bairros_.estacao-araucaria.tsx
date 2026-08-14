import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/estacao-araucaria")({
  component: legacyRouteElements["/bairros/estacao-araucaria"],
});
