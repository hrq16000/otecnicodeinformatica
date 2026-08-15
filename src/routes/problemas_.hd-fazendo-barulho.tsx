import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/hd-fazendo-barulho"];

export const Route = createFileRoute("/problemas_/hd-fazendo-barulho")({
  component: RouteComponent,
});
