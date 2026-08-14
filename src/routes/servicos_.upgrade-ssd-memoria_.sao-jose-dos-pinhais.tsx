import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/upgrade-ssd-memoria/sao-jose-dos-pinhais"];

export const Route = createFileRoute("/servicos_/upgrade-ssd-memoria_/sao-jose-dos-pinhais")({
  component: RouteComponent,
});
