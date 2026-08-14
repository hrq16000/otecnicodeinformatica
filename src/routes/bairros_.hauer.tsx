import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/hauer")({
  component: legacyRouteElements["/bairros/hauer"],
});
