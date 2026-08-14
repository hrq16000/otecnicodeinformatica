import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/centro-almirante-tamandare")({
  component: legacyRouteElements["/bairros/centro-almirante-tamandare"],
});
