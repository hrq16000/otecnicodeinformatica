import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/conserto-celular-curitiba"];

export const Route = createFileRoute("/conserto-celular-curitiba")({
  component: RouteComponent,
});
