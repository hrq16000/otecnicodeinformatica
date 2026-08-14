import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-venancio")({
  component: legacyRouteElements["/bairros/sao-venancio"],
});
