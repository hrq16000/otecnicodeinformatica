import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/conserto-tv-curitiba"];

export const Route = createFileRoute("/conserto-tv-curitiba")({
  component: RouteComponent,
});
