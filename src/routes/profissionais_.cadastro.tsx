import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/profissionais/cadastro"];

export const Route = createFileRoute("/profissionais_/cadastro")({
  component: RouteComponent,
});
