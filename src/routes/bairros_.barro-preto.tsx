import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/barro-preto")({
  component: legacyRouteElements["/bairros/barro-preto"],
});
