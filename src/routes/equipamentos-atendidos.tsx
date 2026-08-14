import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/equipamentos-atendidos"];

export const Route = createFileRoute("/equipamentos-atendidos")({
  component: RouteComponent,
});
