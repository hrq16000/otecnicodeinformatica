import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/redes-wifi_/ecoville")({
  component: legacyRouteElements["/servicos/redes-wifi/ecoville"],
});
