import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/caiua-piraquara")({
  component: legacyRouteElements["/bairros/caiua-piraquara"],
});
