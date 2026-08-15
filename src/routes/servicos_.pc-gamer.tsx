import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/pc-gamer"];

export const Route = createFileRoute("/servicos_/pc-gamer")({
  component: RouteComponent,
});
