import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas-reais-e-casos"];

export const Route = createFileRoute("/problemas-reais-e-casos")({
  component: RouteComponent,
});
