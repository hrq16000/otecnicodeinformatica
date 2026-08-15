import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/valores"];

export const Route = createFileRoute("/valores")({
  component: RouteComponent,
});
