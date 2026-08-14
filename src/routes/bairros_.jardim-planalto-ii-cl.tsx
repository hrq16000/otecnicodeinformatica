import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-planalto-ii-cl")({
  component: legacyRouteElements["/bairros/jardim-planalto-ii-cl"],
});
