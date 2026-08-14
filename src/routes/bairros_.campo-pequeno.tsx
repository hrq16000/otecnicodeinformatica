import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/campo-pequeno")({
  component: legacyRouteElements["/bairros/campo-pequeno"],
});
