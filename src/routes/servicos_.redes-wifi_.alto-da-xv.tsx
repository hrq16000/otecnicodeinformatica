import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/redes-wifi/alto-da-xv"];

export const Route = createFileRoute("/servicos_/redes-wifi_/alto-da-xv")({
  component: RouteComponent,
});
