import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/equipamentos"];

export const Route = createFileRoute("/equipamentos")({
  component: RouteComponent,
});
