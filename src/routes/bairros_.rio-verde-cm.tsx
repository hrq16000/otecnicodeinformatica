import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/rio-verde-cm")({
  component: legacyRouteElements["/bairros/rio-verde-cm"],
});
