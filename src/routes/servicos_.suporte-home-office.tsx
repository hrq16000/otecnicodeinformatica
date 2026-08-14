import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/suporte-home-office")({
  component: legacyRouteElements["/servicos/suporte-home-office"],
});
