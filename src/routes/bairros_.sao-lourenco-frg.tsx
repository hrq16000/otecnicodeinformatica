import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-lourenco-frg")({
  component: legacyRouteElements["/bairros/sao-lourenco-frg"],
});
