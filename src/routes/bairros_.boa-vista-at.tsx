import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/boa-vista-at")({
  component: legacyRouteElements["/bairros/boa-vista-at"],
});
