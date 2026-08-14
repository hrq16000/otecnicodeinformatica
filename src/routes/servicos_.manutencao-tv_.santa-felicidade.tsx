import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/santa-felicidade"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/santa-felicidade")({
  component: RouteComponent,
});
