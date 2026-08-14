import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/rondinha")({
  component: legacyRouteElements["/bairros/rondinha"],
});
