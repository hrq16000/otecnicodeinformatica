import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/conserto-videogame/:local"];

export const Route = createFileRoute("/conserto-videogame_/$local")({
  component: RouteComponent,
});
