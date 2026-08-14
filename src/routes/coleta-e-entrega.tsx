import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/coleta-e-entrega")({
  component: legacyRouteElements["/coleta-e-entrega"],
});
