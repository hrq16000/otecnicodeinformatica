import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/backup-para-empresas"];

export const Route = createFileRoute("/servicos_/backup-para-empresas")({
  component: RouteComponent,
});
