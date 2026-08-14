import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/rio-pequeno-sjp")({
  component: legacyRouteElements["/bairros/rio-pequeno-sjp"],
});
