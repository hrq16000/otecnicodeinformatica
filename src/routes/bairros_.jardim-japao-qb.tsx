import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-japao-qb")({
  component: legacyRouteElements["/bairros/jardim-japao-qb"],
});
