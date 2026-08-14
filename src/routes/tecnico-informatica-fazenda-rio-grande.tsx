import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/tecnico-informatica-fazenda-rio-grande")({
  component: legacyRouteElements["/tecnico-informatica-fazenda-rio-grande"],
});
