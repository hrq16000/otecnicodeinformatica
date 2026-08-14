import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/redes-wifi_/jardim-das-americas")({
  component: legacyRouteElements["/servicos/redes-wifi/jardim-das-americas"],
});
