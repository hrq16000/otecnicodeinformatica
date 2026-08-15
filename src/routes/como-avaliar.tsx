import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/como-avaliar"];

export const Route = createFileRoute("/como-avaliar")({
  component: RouteComponent,
});
