import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/conserto-impressora-curitiba"];

export const Route = createFileRoute("/conserto-impressora-curitiba")({
  component: RouteComponent,
});
