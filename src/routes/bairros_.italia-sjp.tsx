import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/italia-sjp")({
  component: legacyRouteElements["/bairros/italia-sjp"],
});
