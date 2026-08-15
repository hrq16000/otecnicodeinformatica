import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/politica-de-privacidade"];

export const Route = createFileRoute("/politica-de-privacidade")({
  component: RouteComponent,
});
