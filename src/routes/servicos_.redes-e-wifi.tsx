import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/redes-e-wifi"];

export const Route = createFileRoute("/servicos_/redes-e-wifi")({
  component: RouteComponent,
});
