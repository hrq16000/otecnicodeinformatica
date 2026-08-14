import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/juveve")({
  component: legacyRouteElements["/bairros/juveve"],
});
