import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/"];

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
