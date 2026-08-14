import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/espigao-alegre-cm")({
  component: legacyRouteElements["/bairros/espigao-alegre-cm"],
});
