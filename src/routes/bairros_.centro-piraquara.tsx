import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/centro-piraquara")({
  component: legacyRouteElements["/bairros/centro-piraquara"],
});
