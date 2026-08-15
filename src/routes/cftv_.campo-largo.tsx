import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/cftv/campo-largo"];

export const Route = createFileRoute("/cftv_/campo-largo")({
  component: RouteComponent,
});
