import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/formatacao-computador/campo-comprido"];

export const Route = createFileRoute("/servicos_/formatacao-computador_/campo-comprido")({
  component: RouteComponent,
});
