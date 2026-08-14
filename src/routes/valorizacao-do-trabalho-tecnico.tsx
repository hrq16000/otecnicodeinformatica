import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/valorizacao-do-trabalho-tecnico"];

export const Route = createFileRoute("/valorizacao-do-trabalho-tecnico")({
  component: RouteComponent,
});
