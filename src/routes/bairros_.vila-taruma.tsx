import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vila-taruma")({
  component: legacyRouteElements["/bairros/vila-taruma"],
});
