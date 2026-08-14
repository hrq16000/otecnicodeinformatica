import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/cftv_/curitiba")({
  component: legacyRouteElements["/cftv/curitiba"],
});
