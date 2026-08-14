import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/conserto-monitor")({
  component: legacyRouteElements["/servicos/conserto-monitor"],
});
