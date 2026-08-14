import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/palmital-colombo")({
  component: legacyRouteElements["/bairros/palmital-colombo"],
});
