import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/tecnico-informatica-curitiba")({
  component: legacyRouteElements["/tecnico-informatica-curitiba"],
});
