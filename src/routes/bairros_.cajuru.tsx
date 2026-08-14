import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/cajuru")({
  component: legacyRouteElements["/bairros/cajuru"],
});
