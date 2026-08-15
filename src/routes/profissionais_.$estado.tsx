import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/profissionais/:estado"];

export const Route = createFileRoute("/profissionais_/$estado")({
  component: RouteComponent,
});
