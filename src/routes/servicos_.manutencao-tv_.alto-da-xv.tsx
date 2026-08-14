import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/manutencao-tv_/alto-da-xv")({
  component: legacyRouteElements["/servicos/manutencao-tv/alto-da-xv"],
});
