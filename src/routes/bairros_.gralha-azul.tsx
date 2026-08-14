import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/gralha-azul")({
  component: legacyRouteElements["/bairros/gralha-azul"],
});
