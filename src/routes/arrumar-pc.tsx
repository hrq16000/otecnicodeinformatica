import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/arrumar-pc")({
  component: legacyRouteElements["/arrumar-pc"],
});
