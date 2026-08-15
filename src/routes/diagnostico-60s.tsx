import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/diagnostico-60s"];

export const Route = createFileRoute("/diagnostico-60s")({
  component: RouteComponent,
});
