import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/sobre"];

export const Route = createFileRoute("/sobre")({
  component: RouteComponent,
});
