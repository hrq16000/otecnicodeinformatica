import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/conserto-pc-notebook/araucaria"];

export const Route = createFileRoute("/servicos_/conserto-pc-notebook_/araucaria")({
  component: RouteComponent,
});
