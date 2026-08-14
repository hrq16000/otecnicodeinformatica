import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-dimas-colombo")({
  component: legacyRouteElements["/bairros/sao-dimas-colombo"],
});
