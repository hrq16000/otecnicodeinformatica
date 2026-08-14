import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/agua-verde")({
  component: legacyRouteElements["/bairros/agua-verde"],
});
