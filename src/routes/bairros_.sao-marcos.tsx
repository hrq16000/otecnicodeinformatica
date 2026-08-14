import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-marcos")({
  component: legacyRouteElements["/bairros/sao-marcos"],
});
