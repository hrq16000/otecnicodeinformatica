import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/santa-felicidade"];

export const Route = createFileRoute("/bairros_/santa-felicidade")({
  component: RouteComponent,
});
