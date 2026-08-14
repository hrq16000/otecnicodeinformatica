import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/capao-da-imbuia"];

export const Route = createFileRoute("/bairros_/capao-da-imbuia")({
  component: RouteComponent,
});
