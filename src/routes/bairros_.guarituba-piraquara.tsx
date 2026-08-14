import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/guarituba-piraquara")({
  component: legacyRouteElements["/bairros/guarituba-piraquara"],
});
