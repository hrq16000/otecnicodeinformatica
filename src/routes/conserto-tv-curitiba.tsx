import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/conserto-tv-curitiba")({
  component: legacyRouteElements["/conserto-tv-curitiba"],
});
