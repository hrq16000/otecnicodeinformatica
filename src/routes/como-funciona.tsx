import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/como-funciona"];

export const Route = createFileRoute("/como-funciona")({
  component: RouteComponent,
});
