import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-sao-paulo-piraquara")({
  component: legacyRouteElements["/bairros/jardim-sao-paulo-piraquara"],
});
