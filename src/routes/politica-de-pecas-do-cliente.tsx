import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/politica-de-pecas-do-cliente")({
  component: legacyRouteElements["/politica-de-pecas-do-cliente"],
});
