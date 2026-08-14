import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/campina-grande-colombo")({
  component: legacyRouteElements["/bairros/campina-grande-colombo"],
});
