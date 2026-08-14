import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/redes-wifi/boa-vista"];

export const Route = createFileRoute("/servicos_/redes-wifi_/boa-vista")({
  component: RouteComponent,
});
