import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/atuba-colombo")({
  component: legacyRouteElements["/bairros/atuba-colombo"],
});
