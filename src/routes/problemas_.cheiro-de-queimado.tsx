import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/cheiro-de-queimado"];

export const Route = createFileRoute("/problemas_/cheiro-de-queimado")({
  component: RouteComponent,
});
