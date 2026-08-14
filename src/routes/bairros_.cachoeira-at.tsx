import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/cachoeira-at")({
  component: legacyRouteElements["/bairros/cachoeira-at"],
});
