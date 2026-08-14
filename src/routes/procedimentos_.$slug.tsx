import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/procedimentos_/$slug")({
  component: legacyRouteElements["/procedimentos/:slug"],
});
