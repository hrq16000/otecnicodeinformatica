import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/profissional/:slug"];

export const Route = createFileRoute("/profissional_/$slug")({
  component: RouteComponent,
});
