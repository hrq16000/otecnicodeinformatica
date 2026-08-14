import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/cristo-rei")({
  component: legacyRouteElements["/bairros/cristo-rei"],
});
