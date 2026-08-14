import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vila-candida-cl")({
  component: legacyRouteElements["/bairros/vila-candida-cl"],
});
