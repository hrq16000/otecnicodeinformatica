import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/prado-velho-piraquara")({
  component: legacyRouteElements["/bairros/prado-velho-piraquara"],
});
