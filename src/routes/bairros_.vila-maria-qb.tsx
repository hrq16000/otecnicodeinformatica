import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vila-maria-qb")({
  component: legacyRouteElements["/bairros/vila-maria-qb"],
});
