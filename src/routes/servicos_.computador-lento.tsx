import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/computador-lento"];

export const Route = createFileRoute("/servicos_/computador-lento")({
  component: RouteComponent,
});
