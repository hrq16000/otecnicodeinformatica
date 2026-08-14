import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/afonso-pena")({
  component: legacyRouteElements["/bairros/afonso-pena"],
});
