import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/empresa-de-ti-curitiba"];

export const Route = createFileRoute("/empresa-de-ti-curitiba")({
  component: RouteComponent,
});
