import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/colonia-murici-sjp")({
  component: legacyRouteElements["/bairros/colonia-murici-sjp"],
});
