import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/boa-vista")({
  component: legacyRouteElements["/bairros/boa-vista"],
});
