import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/santa-terezinha-colombo")({
  component: legacyRouteElements["/bairros/santa-terezinha-colombo"],
});
