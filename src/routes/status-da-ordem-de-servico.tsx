import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/status-da-ordem-de-servico"];

export const Route = createFileRoute("/status-da-ordem-de-servico")({
  component: RouteComponent,
});
