import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/parque-da-fonte")({
  component: legacyRouteElements["/bairros/parque-da-fonte"],
});
