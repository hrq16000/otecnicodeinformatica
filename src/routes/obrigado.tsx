import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/obrigado"];

export const Route = createFileRoute("/obrigado")({
  component: RouteComponent,
});
