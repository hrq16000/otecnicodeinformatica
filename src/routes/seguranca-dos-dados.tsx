import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/seguranca-dos-dados"];

export const Route = createFileRoute("/seguranca-dos-dados")({
  component: RouteComponent,
});
