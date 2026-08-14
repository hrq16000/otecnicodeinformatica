import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/cftv_/guaratuba")({
  component: legacyRouteElements["/cftv/guaratuba"],
});
