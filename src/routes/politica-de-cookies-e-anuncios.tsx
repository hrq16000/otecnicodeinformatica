import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/politica-de-cookies-e-anuncios"];

export const Route = createFileRoute("/politica-de-cookies-e-anuncios")({
  component: RouteComponent,
});
