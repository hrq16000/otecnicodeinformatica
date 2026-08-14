import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-florestal-qb")({
  component: legacyRouteElements["/bairros/jardim-florestal-qb"],
});
