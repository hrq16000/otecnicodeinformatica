import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/blog/:slug"];

export const Route = createFileRoute("/blog_/$slug")({
  component: RouteComponent,
});
