import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/conserto-videogame-curitiba")({
  component: legacyRouteElements["/conserto-videogame-curitiba"],
});
