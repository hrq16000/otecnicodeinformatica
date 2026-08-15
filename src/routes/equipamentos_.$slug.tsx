import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/equipamentos/:slug"];

export const Route = createFileRoute("/equipamentos_/$slug")({
  component: RouteComponent,
});
