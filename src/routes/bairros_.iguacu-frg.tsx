import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/iguacu-frg")({
  component: legacyRouteElements["/bairros/iguacu-frg"],
});
