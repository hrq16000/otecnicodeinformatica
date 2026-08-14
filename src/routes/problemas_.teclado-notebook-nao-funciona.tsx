import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/teclado-notebook-nao-funciona")({
  component: legacyRouteElements["/problemas/teclado-notebook-nao-funciona"],
});
