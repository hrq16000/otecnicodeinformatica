import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-novo-horizonte-cl")({
  component: legacyRouteElements["/bairros/jardim-novo-horizonte-cl"],
});
