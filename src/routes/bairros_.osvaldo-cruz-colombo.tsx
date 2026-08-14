import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/osvaldo-cruz-colombo")({
  component: legacyRouteElements["/bairros/osvaldo-cruz-colombo"],
});
