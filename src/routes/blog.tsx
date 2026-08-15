import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/blog"];

export const Route = createFileRoute("/blog")({
  component: RouteComponent,
});
