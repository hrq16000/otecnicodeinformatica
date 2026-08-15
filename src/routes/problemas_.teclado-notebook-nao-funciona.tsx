import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/teclado-notebook-nao-funciona"];

export const Route = createFileRoute("/problemas_/teclado-notebook-nao-funciona")({
  component: RouteComponent,
});
