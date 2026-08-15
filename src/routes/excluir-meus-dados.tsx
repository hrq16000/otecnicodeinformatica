import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/excluir-meus-dados"];

export const Route = createFileRoute("/excluir-meus-dados")({
  component: RouteComponent,
});
