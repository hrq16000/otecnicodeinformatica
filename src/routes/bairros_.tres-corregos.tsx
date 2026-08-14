import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/tres-corregos")({
  component: legacyRouteElements["/bairros/tres-corregos"],
});
