import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/thomaz-coelho-ii")({
  component: legacyRouteElements["/bairros/thomaz-coelho-ii"],
});
