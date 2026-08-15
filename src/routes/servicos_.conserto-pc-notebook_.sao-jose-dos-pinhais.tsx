import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/conserto-pc-notebook/sao-jose-dos-pinhais"];

export const Route = createFileRoute("/servicos_/conserto-pc-notebook_/sao-jose-dos-pinhais")({
  component: RouteComponent,
});
