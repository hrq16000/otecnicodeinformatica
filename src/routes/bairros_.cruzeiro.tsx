import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/cruzeiro")({
  component: legacyRouteElements["/bairros/cruzeiro"],
});
