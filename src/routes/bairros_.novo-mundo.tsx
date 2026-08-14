import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/novo-mundo")({
  component: legacyRouteElements["/bairros/novo-mundo"],
});
