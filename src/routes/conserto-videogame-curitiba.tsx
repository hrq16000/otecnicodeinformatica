import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/conserto-videogame-curitiba"];

export const Route = createFileRoute("/conserto-videogame-curitiba")({
  component: RouteComponent,
});
