import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/backup-recuperacao_/centro")({
  component: legacyRouteElements["/servicos/backup-recuperacao/centro"],
});
