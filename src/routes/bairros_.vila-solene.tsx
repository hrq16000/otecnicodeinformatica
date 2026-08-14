import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vila-solene")({
  component: legacyRouteElements["/bairros/vila-solene"],
});
