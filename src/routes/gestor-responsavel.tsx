import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/gestor-responsavel")({
  component: legacyRouteElements["/gestor-responsavel"],
});
