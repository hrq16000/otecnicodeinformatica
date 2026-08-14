import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-america-campo-largo")({
  component: legacyRouteElements["/bairros/jardim-america-campo-largo"],
});
