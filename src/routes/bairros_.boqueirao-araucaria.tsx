import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/boqueirao-araucaria")({
  component: legacyRouteElements["/bairros/boqueirao-araucaria"],
});
