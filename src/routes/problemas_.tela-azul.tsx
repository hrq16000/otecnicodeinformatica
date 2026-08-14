import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/tela-azul")({
  component: legacyRouteElements["/problemas/tela-azul"],
});
