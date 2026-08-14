import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-bela-vista-piraquara")({
  component: legacyRouteElements["/bairros/jardim-bela-vista-piraquara"],
});
