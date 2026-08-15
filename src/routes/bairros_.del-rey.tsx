import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/del-rey"];

export const Route = createFileRoute("/bairros_/del-rey")({
  component: RouteComponent,
});
