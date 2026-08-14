import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/santa-terezinha-frg")({
  component: legacyRouteElements["/bairros/santa-terezinha-frg"],
});
