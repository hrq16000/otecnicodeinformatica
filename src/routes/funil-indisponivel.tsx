import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/funil-indisponivel"];

export const Route = createFileRoute("/funil-indisponivel")({
  component: RouteComponent,
});
