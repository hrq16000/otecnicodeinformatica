import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/monza-colombo")({
  component: legacyRouteElements["/bairros/monza-colombo"],
});
