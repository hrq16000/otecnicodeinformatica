import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/status-da-ordem-de-servico")({
  component: legacyRouteElements["/status-da-ordem-de-servico"],
});
