import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-das-americas")({
  component: legacyRouteElements["/bairros/jardim-das-americas"],
});
