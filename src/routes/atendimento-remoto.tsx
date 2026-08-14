import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/atendimento-remoto")({
  component: legacyRouteElements["/atendimento-remoto"],
});
