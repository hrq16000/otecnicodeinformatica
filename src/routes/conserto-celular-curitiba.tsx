import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/conserto-celular-curitiba")({
  component: legacyRouteElements["/conserto-celular-curitiba"],
});
