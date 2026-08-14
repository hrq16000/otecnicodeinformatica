import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/bateias")({
  component: legacyRouteElements["/bairros/bateias"],
});
