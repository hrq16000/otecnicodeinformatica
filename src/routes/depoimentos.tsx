import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/depoimentos"];

export const Route = createFileRoute("/depoimentos")({
  component: RouteComponent,
});
