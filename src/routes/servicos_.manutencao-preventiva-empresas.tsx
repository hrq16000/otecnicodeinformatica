import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/manutencao-preventiva-empresas")({
  component: legacyRouteElements["/servicos/manutencao-preventiva-empresas"],
});
