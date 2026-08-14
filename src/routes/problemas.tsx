import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas"];

export const Route = createFileRoute("/problemas")({
  component: RouteComponent,
});
