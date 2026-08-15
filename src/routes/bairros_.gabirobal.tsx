import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/gabirobal"];

export const Route = createFileRoute("/bairros_/gabirobal")({
  component: RouteComponent,
});
