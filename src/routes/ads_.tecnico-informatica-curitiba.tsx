import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/ads_/tecnico-informatica-curitiba")({
  component: legacyRouteElements["/ads/tecnico-informatica-curitiba"],
});
