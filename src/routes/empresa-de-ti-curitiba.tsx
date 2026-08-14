import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/empresa-de-ti-curitiba")({
  component: legacyRouteElements["/empresa-de-ti-curitiba"],
});
