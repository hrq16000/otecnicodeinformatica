import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-lourenco-qb")({
  component: legacyRouteElements["/bairros/sao-lourenco-qb"],
});
