import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/cidade-jardim-sjp")({
  component: legacyRouteElements["/bairros/cidade-jardim-sjp"],
});
