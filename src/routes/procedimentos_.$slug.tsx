import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/procedimentos/:slug"];

export const Route = createFileRoute("/procedimentos_/$slug")({
  component: RouteComponent,
});
