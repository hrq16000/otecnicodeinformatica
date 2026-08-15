import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/profissionais"];

export const Route = createFileRoute("/profissionais")({
  component: RouteComponent,
});
