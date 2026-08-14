import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/contato"];

export const Route = createFileRoute("/contato")({
  component: RouteComponent,
});
