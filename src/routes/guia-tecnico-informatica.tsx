import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/guia-tecnico-informatica"];

export const Route = createFileRoute("/guia-tecnico-informatica")({
  component: RouteComponent,
});
