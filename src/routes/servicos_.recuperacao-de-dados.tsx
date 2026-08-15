import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/recuperacao-de-dados"];

export const Route = createFileRoute("/servicos_/recuperacao-de-dados")({
  component: RouteComponent,
});
