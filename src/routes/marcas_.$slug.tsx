import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/marcas/:slug"];

export const Route = createFileRoute("/marcas_/$slug")({
  component: RouteComponent,
});
