import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/atendimento-domicilio")({
  component: legacyRouteElements["/atendimento-domicilio"],
});
