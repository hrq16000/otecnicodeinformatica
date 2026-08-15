import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/conserto-placa"];

export const Route = createFileRoute("/servicos_/conserto-placa")({
  component: RouteComponent,
});
