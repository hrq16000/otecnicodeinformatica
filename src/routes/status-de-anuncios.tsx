import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/status-de-anuncios"];

export const Route = createFileRoute("/status-de-anuncios")({
  component: RouteComponent,
});
