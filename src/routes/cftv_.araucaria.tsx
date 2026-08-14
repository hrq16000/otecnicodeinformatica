import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/cftv_/araucaria")({
  component: legacyRouteElements["/cftv/araucaria"],
});
