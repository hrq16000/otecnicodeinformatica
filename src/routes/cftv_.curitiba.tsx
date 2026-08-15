import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/cftv/curitiba"];

export const Route = createFileRoute("/cftv_/curitiba")({
  component: RouteComponent,
});
