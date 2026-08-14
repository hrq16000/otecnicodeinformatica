import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/roca-grande")({
  component: legacyRouteElements["/bairros/roca-grande"],
});
