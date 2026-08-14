import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/alto-maracana")({
  component: legacyRouteElements["/bairros/alto-maracana"],
});
