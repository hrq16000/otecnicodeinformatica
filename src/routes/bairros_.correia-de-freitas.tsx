import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/correia-de-freitas")({
  component: legacyRouteElements["/bairros/correia-de-freitas"],
});
