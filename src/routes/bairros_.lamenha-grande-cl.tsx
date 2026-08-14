import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/lamenha-grande-cl")({
  component: legacyRouteElements["/bairros/lamenha-grande-cl"],
});
