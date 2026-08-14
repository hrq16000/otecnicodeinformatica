import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-sao-jorge-at")({
  component: legacyRouteElements["/bairros/jardim-sao-jorge-at"],
});
