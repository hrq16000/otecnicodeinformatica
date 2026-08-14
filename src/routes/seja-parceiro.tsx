import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/seja-parceiro"];

export const Route = createFileRoute("/seja-parceiro")({
  component: RouteComponent,
});
