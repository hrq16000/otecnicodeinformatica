import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-planalto-campo-largo")({
  component: legacyRouteElements["/bairros/jardim-planalto-campo-largo"],
});
