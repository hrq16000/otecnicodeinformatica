import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/tranqueira-at")({
  component: legacyRouteElements["/bairros/tranqueira-at"],
});
