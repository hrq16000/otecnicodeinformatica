import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/redes-wifi/cic"];

export const Route = createFileRoute("/servicos_/redes-wifi_/cic")({
  component: RouteComponent,
});
