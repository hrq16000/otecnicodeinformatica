import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-uniao-piraquara")({
  component: legacyRouteElements["/bairros/jardim-uniao-piraquara"],
});
