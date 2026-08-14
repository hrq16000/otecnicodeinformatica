import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/upgrade-ssd-memoria/batel"];

export const Route = createFileRoute("/servicos_/upgrade-ssd-memoria_/batel")({
  component: RouteComponent,
});
