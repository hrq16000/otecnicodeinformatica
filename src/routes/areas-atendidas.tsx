import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/areas-atendidas"];

export const Route = createFileRoute("/areas-atendidas")({
  component: RouteComponent,
});
