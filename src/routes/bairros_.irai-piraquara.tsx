import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/irai-piraquara")({
  component: legacyRouteElements["/bairros/irai-piraquara"],
});
