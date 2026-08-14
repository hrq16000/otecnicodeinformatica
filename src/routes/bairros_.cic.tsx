import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/cic")({
  component: legacyRouteElements["/bairros/cic"],
});
