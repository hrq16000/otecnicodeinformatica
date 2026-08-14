import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/eucaliptos-frg")({
  component: legacyRouteElements["/bairros/eucaliptos-frg"],
});
