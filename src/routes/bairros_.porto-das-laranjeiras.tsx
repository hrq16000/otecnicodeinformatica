import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/porto-das-laranjeiras"];

export const Route = createFileRoute("/bairros_/porto-das-laranjeiras")({
  component: RouteComponent,
});
