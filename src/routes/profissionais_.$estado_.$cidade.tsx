import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/profissionais/:estado/:cidade"];

export const Route = createFileRoute("/profissionais_/$estado_/$cidade")({
  component: RouteComponent,
});
