import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/nacoes-frg")({
  component: legacyRouteElements["/bairros/nacoes-frg"],
});
