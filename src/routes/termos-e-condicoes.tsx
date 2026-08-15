import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/termos-e-condicoes"];

export const Route = createFileRoute("/termos-e-condicoes")({
  component: RouteComponent,
});
