import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/backup-para-empresas")({
  component: legacyRouteElements["/servicos/backup-para-empresas"],
});
