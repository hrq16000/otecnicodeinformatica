import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/portao")({
  component: legacyRouteElements["/bairros/portao"],
});
