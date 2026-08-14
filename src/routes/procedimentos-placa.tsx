import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/procedimentos-placa")({
  component: legacyRouteElements["/procedimentos-placa"],
});
