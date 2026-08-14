import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vale-das-aguas")({
  component: legacyRouteElements["/bairros/vale-das-aguas"],
});
