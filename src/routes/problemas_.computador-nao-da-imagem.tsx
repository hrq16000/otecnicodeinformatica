import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/computador-nao-da-imagem")({
  component: legacyRouteElements["/problemas/computador-nao-da-imagem"],
});
