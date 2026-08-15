import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/impressora-nao-imprime"];

export const Route = createFileRoute("/problemas_/impressora-nao-imprime")({
  component: RouteComponent,
});
