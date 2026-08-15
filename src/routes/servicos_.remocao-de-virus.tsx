import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/remocao-de-virus"];

export const Route = createFileRoute("/servicos_/remocao-de-virus")({
  component: RouteComponent,
});
