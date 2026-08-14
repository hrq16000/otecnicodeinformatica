import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/redes-wifi_/alto-da-xv")({
  component: legacyRouteElements["/servicos/redes-wifi/alto-da-xv"],
});
