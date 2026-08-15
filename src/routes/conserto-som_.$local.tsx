import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/conserto-som/:local"];

export const Route = createFileRoute("/conserto-som_/$local")({
  component: RouteComponent,
});
