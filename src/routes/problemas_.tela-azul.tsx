import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/tela-azul"];

export const Route = createFileRoute("/problemas_/tela-azul")({
  component: RouteComponent,
});
