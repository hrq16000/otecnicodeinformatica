import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/redes-wifi/sao-jose-dos-pinhais"];

export const Route = createFileRoute("/servicos_/redes-wifi_/sao-jose-dos-pinhais")({
  component: RouteComponent,
});
