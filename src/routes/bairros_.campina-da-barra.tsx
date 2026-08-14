import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/campina-da-barra")({
  component: legacyRouteElements["/bairros/campina-da-barra"],
});
