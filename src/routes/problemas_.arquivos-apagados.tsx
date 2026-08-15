import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/arquivos-apagados"];

export const Route = createFileRoute("/problemas_/arquivos-apagados")({
  component: RouteComponent,
});
