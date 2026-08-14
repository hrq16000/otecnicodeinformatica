import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/conserto-som-curitiba")({
  component: legacyRouteElements["/conserto-som-curitiba"],
});
