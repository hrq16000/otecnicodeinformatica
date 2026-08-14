import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/remocao-virus/araucaria"];

export const Route = createFileRoute("/servicos_/remocao-virus_/araucaria")({
  component: RouteComponent,
});
