import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/assistencia-tecnica-curitiba"];

export const Route = createFileRoute("/assistencia-tecnica-curitiba")({
  component: RouteComponent,
});
