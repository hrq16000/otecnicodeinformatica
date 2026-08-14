import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/atendimento-domicilio"];

export const Route = createFileRoute("/atendimento-domicilio")({
  component: RouteComponent,
});
