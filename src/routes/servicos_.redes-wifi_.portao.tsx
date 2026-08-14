import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/redes-wifi_/portao")({
  component: legacyRouteElements["/servicos/redes-wifi/portao"],
});
