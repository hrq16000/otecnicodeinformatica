import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vila-sao-jose-qb")({
  component: legacyRouteElements["/bairros/vila-sao-jose-qb"],
});
