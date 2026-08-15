import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/avaliar"];

export const Route = createFileRoute("/avaliar")({
  component: RouteComponent,
});
