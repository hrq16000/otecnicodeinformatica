import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/taruma")({
  component: legacyRouteElements["/bairros/taruma"],
});
