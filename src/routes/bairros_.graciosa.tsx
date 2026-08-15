import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/graciosa"];

export const Route = createFileRoute("/bairros_/graciosa")({
  component: RouteComponent,
});
