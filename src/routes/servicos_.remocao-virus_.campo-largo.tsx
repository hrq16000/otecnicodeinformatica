import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/remocao-virus_/campo-largo")({
  component: legacyRouteElements["/servicos/remocao-virus/campo-largo"],
});
