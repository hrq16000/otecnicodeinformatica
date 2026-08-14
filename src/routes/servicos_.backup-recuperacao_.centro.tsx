import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/backup-recuperacao/centro"];

export const Route = createFileRoute("/servicos_/backup-recuperacao_/centro")({
  component: RouteComponent,
});
