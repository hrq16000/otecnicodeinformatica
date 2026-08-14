import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/merces")({
  component: legacyRouteElements["/bairros/merces"],
});
