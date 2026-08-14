import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/braga")({
  component: legacyRouteElements["/bairros/braga"],
});
