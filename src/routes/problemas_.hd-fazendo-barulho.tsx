import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/hd-fazendo-barulho")({
  component: legacyRouteElements["/problemas/hd-fazendo-barulho"],
});
