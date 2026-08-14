import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/notebook-molhado"];

export const Route = createFileRoute("/problemas_/notebook-molhado")({
  component: RouteComponent,
});
