import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/centro-colombo")({
  component: legacyRouteElements["/bairros/centro-colombo"],
});
