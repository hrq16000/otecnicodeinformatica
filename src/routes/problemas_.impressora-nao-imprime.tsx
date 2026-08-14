import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/impressora-nao-imprime")({
  component: legacyRouteElements["/problemas/impressora-nao-imprime"],
});
