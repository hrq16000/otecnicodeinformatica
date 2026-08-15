import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/quando-nao-compensa"];

export const Route = createFileRoute("/quando-nao-compensa")({
  component: RouteComponent,
});
