import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/pedro-moro-sjp"];

export const Route = createFileRoute("/bairros_/pedro-moro-sjp")({
  component: RouteComponent,
});
