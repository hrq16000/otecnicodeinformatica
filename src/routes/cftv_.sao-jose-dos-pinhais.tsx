import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/cftv_/sao-jose-dos-pinhais")({
  component: legacyRouteElements["/cftv/sao-jose-dos-pinhais"],
});
