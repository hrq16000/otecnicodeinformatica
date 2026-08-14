import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/tangua-at")({
  component: legacyRouteElements["/bairros/tangua-at"],
});
