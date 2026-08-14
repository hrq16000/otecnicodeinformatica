import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/alto-taruma")({
  component: legacyRouteElements["/bairros/alto-taruma"],
});
