import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/colonia-malhada-cl")({
  component: legacyRouteElements["/bairros/colonia-malhada-cl"],
});
