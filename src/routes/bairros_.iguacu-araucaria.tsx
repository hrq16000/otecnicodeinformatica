import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/iguacu-araucaria")({
  component: legacyRouteElements["/bairros/iguacu-araucaria"],
});
