import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/precos-e-politicas"];

export const Route = createFileRoute("/precos-e-politicas")({
  component: RouteComponent,
});
