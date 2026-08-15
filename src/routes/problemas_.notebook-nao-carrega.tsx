import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/notebook-nao-carrega"];

export const Route = createFileRoute("/problemas_/notebook-nao-carrega")({
  component: RouteComponent,
});
