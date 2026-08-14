import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/guatupe")({
  component: legacyRouteElements["/bairros/guatupe"],
});
