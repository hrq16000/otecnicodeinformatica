import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-sebastiao-cm")({
  component: legacyRouteElements["/bairros/sao-sebastiao-cm"],
});
