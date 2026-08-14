import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos"];

export const Route = createFileRoute("/servicos")({
  component: RouteComponent,
});
