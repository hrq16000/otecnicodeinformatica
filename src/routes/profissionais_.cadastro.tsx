import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/profissionais_/cadastro")({
  component: legacyRouteElements["/profissionais/cadastro"],
});
