import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/diagnostico-tecnico")({
  component: legacyRouteElements["/diagnostico-tecnico"],
});
