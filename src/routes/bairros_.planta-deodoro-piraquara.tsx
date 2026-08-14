import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/planta-deodoro-piraquara")({
  component: legacyRouteElements["/bairros/planta-deodoro-piraquara"],
});
