import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/computador-nao-liga")({
  component: legacyRouteElements["/servicos/computador-nao-liga"],
});
