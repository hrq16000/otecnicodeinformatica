import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/hugo-lange")({
  component: legacyRouteElements["/bairros/hugo-lange"],
});
