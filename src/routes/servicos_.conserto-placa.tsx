import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/conserto-placa")({
  component: legacyRouteElements["/servicos/conserto-placa"],
});
