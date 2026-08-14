import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/remocao-virus_/batel")({
  component: legacyRouteElements["/servicos/remocao-virus/batel"],
});
