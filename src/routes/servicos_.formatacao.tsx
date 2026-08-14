import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/formatacao")({
  component: legacyRouteElements["/servicos/formatacao"],
});
