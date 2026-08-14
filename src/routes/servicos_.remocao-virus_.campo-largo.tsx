import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/remocao-virus/campo-largo"];

export const Route = createFileRoute("/servicos_/remocao-virus_/campo-largo")({
  component: RouteComponent,
});
