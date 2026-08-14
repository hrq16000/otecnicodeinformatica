import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/maracana-colombo")({
  component: legacyRouteElements["/bairros/maracana-colombo"],
});
