import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/boqueirao")({
  component: legacyRouteElements["/bairros/boqueirao"],
});
