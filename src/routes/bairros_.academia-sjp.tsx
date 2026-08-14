import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/academia-sjp")({
  component: legacyRouteElements["/bairros/academia-sjp"],
});
