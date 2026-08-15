import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/computador-esquentando"];

export const Route = createFileRoute("/problemas_/computador-esquentando")({
  component: RouteComponent,
});
