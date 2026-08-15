import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/conserto-tv"];

export const Route = createFileRoute("/servicos_/conserto-tv")({
  component: RouteComponent,
});
