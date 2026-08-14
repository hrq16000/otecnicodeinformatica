import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/conserto-tv/:local"];

export const Route = createFileRoute("/conserto-tv_/$local")({
  component: RouteComponent,
});
