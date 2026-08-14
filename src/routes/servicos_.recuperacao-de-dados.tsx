import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/recuperacao-de-dados")({
  component: legacyRouteElements["/servicos/recuperacao-de-dados"],
});
