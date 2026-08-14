import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/graciosa-qb")({
  component: legacyRouteElements["/bairros/graciosa-qb"],
});
