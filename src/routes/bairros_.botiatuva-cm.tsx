import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/botiatuva-cm")({
  component: legacyRouteElements["/bairros/botiatuva-cm"],
});
