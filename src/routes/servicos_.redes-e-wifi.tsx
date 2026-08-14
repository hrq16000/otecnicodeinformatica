import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/redes-e-wifi")({
  component: legacyRouteElements["/servicos/redes-e-wifi"],
});
