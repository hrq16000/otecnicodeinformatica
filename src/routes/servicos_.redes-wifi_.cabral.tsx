import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/redes-wifi/cabral"];

export const Route = createFileRoute("/servicos_/redes-wifi_/cabral")({
  component: RouteComponent,
});
