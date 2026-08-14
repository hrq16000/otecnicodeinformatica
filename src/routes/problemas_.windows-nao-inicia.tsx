import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/windows-nao-inicia")({
  component: legacyRouteElements["/problemas/windows-nao-inicia"],
});
