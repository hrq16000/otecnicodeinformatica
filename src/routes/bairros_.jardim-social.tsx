import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-social")({
  component: legacyRouteElements["/bairros/jardim-social"],
});
