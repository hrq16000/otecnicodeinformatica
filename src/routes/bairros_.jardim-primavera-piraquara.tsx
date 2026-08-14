import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-primavera-piraquara")({
  component: legacyRouteElements["/bairros/jardim-primavera-piraquara"],
});
