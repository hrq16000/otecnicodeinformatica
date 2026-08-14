import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/cftv_/pinhais")({
  component: legacyRouteElements["/cftv/pinhais"],
});
