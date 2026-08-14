import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-santo-antonio-piraquara")({
  component: legacyRouteElements["/bairros/jardim-santo-antonio-piraquara"],
});
