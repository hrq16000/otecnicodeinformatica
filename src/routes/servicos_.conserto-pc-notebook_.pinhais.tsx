import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/conserto-pc-notebook_/pinhais")({
  component: legacyRouteElements["/servicos/conserto-pc-notebook/pinhais"],
});
