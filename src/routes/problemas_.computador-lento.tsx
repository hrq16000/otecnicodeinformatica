import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/computador-lento"];

export const Route = createFileRoute("/problemas_/computador-lento")({
  component: RouteComponent,
});
