import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/atendimento-remoto"];

export const Route = createFileRoute("/atendimento-remoto")({
  component: RouteComponent,
});
