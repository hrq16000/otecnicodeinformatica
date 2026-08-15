import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/ads/tecnico-informatica-curitiba"];

export const Route = createFileRoute("/ads_/tecnico-informatica-curitiba")({
  component: RouteComponent,
});
