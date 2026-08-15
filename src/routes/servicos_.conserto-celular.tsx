import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/conserto-celular"];

export const Route = createFileRoute("/servicos_/conserto-celular")({
  component: RouteComponent,
});
