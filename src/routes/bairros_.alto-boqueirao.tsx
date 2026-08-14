import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/alto-boqueirao")({
  component: legacyRouteElements["/bairros/alto-boqueirao"],
});
