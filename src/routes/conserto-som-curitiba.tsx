import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/conserto-som-curitiba"];

export const Route = createFileRoute("/conserto-som-curitiba")({
  component: RouteComponent,
});
