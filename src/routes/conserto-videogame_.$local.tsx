import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/conserto-videogame_/$local")({
  component: legacyRouteElements["/conserto-videogame/:local"],
});
