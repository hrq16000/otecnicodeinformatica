import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/redes-wifi/araucaria"];

export const Route = createFileRoute("/servicos_/redes-wifi_/araucaria")({
  component: RouteComponent,
});
