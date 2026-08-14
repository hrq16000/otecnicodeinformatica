import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/blog_/$slug")({
  component: legacyRouteElements["/blog/:slug"],
});
