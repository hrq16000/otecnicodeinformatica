import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-botanico")({
  component: legacyRouteElements["/bairros/jardim-botanico"],
});
