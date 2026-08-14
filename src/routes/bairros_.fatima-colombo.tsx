import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/fatima-colombo")({
  component: legacyRouteElements["/bairros/fatima-colombo"],
});
