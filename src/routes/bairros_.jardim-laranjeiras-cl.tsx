import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-laranjeiras-cl")({
  component: legacyRouteElements["/bairros/jardim-laranjeiras-cl"],
});
