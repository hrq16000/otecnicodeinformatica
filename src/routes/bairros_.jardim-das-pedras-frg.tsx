import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-das-pedras-frg")({
  component: legacyRouteElements["/bairros/jardim-das-pedras-frg"],
});
