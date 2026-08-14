import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/seminario")({
  component: legacyRouteElements["/bairros/seminario"],
});
