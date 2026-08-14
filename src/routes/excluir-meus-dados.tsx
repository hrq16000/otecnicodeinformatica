import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/excluir-meus-dados")({
  component: legacyRouteElements["/excluir-meus-dados"],
});
