import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/sobre")({
  component: legacyRouteElements["/sobre"],
});
