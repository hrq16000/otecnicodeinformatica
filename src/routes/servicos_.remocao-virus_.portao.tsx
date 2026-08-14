import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/remocao-virus/portao"];

export const Route = createFileRoute("/servicos_/remocao-virus_/portao")({
  component: RouteComponent,
});
