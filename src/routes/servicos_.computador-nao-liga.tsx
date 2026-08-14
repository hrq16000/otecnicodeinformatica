import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/computador-nao-liga"];

export const Route = createFileRoute("/servicos_/computador-nao-liga")({
  component: RouteComponent,
});
