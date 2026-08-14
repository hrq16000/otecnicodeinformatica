import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/graciosa")({
  component: legacyRouteElements["/bairros/graciosa"],
});
