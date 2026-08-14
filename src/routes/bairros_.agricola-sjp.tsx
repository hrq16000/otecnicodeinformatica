import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/agricola-sjp")({
  component: legacyRouteElements["/bairros/agricola-sjp"],
});
