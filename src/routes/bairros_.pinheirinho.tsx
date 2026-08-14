import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/pinheirinho")({
  component: legacyRouteElements["/bairros/pinheirinho"],
});
