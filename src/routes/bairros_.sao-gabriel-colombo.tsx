import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-gabriel-colombo")({
  component: legacyRouteElements["/bairros/sao-gabriel-colombo"],
});
