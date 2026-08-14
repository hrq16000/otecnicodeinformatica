import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/colonia-antonio-prado")({
  component: legacyRouteElements["/bairros/colonia-antonio-prado"],
});
