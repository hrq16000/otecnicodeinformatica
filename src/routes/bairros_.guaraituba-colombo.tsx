import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/guaraituba-colombo")({
  component: legacyRouteElements["/bairros/guaraituba-colombo"],
});
