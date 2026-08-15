import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/marcas"];

export const Route = createFileRoute("/marcas")({
  component: RouteComponent,
});
