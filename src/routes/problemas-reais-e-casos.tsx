import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas-reais-e-casos")({
  component: legacyRouteElements["/problemas-reais-e-casos"],
});
