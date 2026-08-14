import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/capela-velha")({
  component: legacyRouteElements["/bairros/capela-velha"],
});
