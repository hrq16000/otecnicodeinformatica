import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/formatacao-computador/campo-largo"];

export const Route = createFileRoute("/servicos_/formatacao-computador_/campo-largo")({
  component: RouteComponent,
});
