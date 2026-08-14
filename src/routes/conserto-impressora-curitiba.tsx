import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/conserto-impressora-curitiba")({
  component: legacyRouteElements["/conserto-impressora-curitiba"],
});
