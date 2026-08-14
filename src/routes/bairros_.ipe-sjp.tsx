import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/ipe-sjp")({
  component: legacyRouteElements["/bairros/ipe-sjp"],
});
