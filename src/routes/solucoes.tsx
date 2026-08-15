import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/solucoes"];

export const Route = createFileRoute("/solucoes")({
  component: RouteComponent,
});
