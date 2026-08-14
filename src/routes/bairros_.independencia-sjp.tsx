import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/independencia-sjp")({
  component: legacyRouteElements["/bairros/independencia-sjp"],
});
