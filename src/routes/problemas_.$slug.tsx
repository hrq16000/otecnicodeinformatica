import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/:slug"];

export const Route = createFileRoute("/problemas_/$slug")({
  component: RouteComponent,
});
