import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/estancia-pinhais")({
  component: legacyRouteElements["/bairros/estancia-pinhais"],
});
