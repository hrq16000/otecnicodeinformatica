import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/politica-de-cookies-e-anuncios")({
  component: legacyRouteElements["/politica-de-cookies-e-anuncios"],
});
