import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/emiliano-perneta")({
  component: legacyRouteElements["/bairros/emiliano-perneta"],
});
