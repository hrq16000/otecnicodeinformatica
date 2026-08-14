import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sabia")({
  component: legacyRouteElements["/bairros/sabia"],
});
