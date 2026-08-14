import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sete-vilas")({
  component: legacyRouteElements["/bairros/sete-vilas"],
});
