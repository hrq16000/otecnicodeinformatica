import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-ipe-frg")({
  component: legacyRouteElements["/bairros/jardim-ipe-frg"],
});
