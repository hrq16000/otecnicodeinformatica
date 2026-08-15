import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/conserto-pc-notebook/cic"];

export const Route = createFileRoute("/servicos_/conserto-pc-notebook_/cic")({
  component: RouteComponent,
});
