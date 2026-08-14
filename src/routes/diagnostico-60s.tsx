import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/diagnostico-60s")({
  component: legacyRouteElements["/diagnostico-60s"],
});
