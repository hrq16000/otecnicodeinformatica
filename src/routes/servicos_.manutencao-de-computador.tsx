import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-de-computador"];

export const Route = createFileRoute("/servicos_/manutencao-de-computador")({
  component: RouteComponent,
});
