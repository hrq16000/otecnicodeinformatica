import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/boneca-do-iguacu-sjp"];

export const Route = createFileRoute("/bairros_/boneca-do-iguacu-sjp")({
  component: RouteComponent,
});
