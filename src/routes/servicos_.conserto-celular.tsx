import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/conserto-celular")({
  component: legacyRouteElements["/servicos/conserto-celular"],
});
