import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/ordem-de-servico"];

export const Route = createFileRoute("/ordem-de-servico")({
  component: RouteComponent,
});
