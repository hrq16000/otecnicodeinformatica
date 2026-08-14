import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/tingui")({
  component: legacyRouteElements["/bairros/tingui"],
});
