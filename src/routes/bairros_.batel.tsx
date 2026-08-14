import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/batel")({
  component: legacyRouteElements["/bairros/batel"],
});
