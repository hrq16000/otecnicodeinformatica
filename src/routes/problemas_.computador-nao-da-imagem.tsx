import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/computador-nao-da-imagem"];

export const Route = createFileRoute("/problemas_/computador-nao-da-imagem")({
  component: RouteComponent,
});
