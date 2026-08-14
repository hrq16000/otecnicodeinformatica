import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/maria-antonieta")({
  component: legacyRouteElements["/bairros/maria-antonieta"],
});
