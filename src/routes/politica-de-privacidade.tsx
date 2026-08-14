import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/politica-de-privacidade")({
  component: legacyRouteElements["/politica-de-privacidade"],
});
