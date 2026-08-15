import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/windows-nao-inicia"];

export const Route = createFileRoute("/problemas_/windows-nao-inicia")({
  component: RouteComponent,
});
