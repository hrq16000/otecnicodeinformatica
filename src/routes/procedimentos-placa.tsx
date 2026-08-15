import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/procedimentos-placa"];

export const Route = createFileRoute("/procedimentos-placa")({
  component: RouteComponent,
});
