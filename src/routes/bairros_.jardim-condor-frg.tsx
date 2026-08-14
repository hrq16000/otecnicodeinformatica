import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-condor-frg")({
  component: legacyRouteElements["/bairros/jardim-condor-frg"],
});
