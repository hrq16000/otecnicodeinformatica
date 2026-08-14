import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/assistencia-tecnica-curitiba")({
  component: legacyRouteElements["/assistencia-tecnica-curitiba"],
});
