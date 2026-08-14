import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-monte-santo")({
  component: legacyRouteElements["/bairros/jardim-monte-santo"],
});
