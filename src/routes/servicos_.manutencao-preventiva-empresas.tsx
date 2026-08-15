import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-preventiva-empresas"];

export const Route = createFileRoute("/servicos_/manutencao-preventiva-empresas")({
  component: RouteComponent,
});
