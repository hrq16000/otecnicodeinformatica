import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-domingos")({
  component: legacyRouteElements["/bairros/sao-domingos"],
});
