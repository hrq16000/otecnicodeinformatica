import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/itaqui")({
  component: legacyRouteElements["/bairros/itaqui"],
});
