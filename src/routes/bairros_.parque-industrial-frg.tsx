import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/parque-industrial-frg")({
  component: legacyRouteElements["/bairros/parque-industrial-frg"],
});
