import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/embu-colombo")({
  component: legacyRouteElements["/bairros/embu-colombo"],
});
