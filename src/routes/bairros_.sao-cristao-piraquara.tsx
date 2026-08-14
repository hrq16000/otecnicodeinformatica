import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-cristao-piraquara")({
  component: legacyRouteElements["/bairros/sao-cristao-piraquara"],
});
