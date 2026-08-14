import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/status-de-anuncios")({
  component: legacyRouteElements["/status-de-anuncios"],
});
