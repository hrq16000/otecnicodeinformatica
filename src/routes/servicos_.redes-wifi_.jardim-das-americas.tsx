import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/redes-wifi/jardim-das-americas"];

export const Route = createFileRoute("/servicos_/redes-wifi_/jardim-das-americas")({
  component: RouteComponent,
});
