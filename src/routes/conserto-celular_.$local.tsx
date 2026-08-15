import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/conserto-celular/:local"];

export const Route = createFileRoute("/conserto-celular_/$local")({
  component: RouteComponent,
});
