import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/remocao-virus/batel"];

export const Route = createFileRoute("/servicos_/remocao-virus_/batel")({
  component: RouteComponent,
});
