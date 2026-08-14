import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/joquei-clube-cm")({
  component: legacyRouteElements["/bairros/joquei-clube-cm"],
});
