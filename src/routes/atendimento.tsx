import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/atendimento"];

export const Route = createFileRoute("/atendimento")({
  component: RouteComponent,
});
