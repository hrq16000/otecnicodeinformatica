import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/creditos-de-imagens"];

export const Route = createFileRoute("/creditos-de-imagens")({
  component: RouteComponent,
});
