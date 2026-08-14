import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/pioneiros-frg")({
  component: legacyRouteElements["/bairros/pioneiros-frg"],
});
