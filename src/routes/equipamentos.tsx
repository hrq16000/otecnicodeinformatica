import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/equipamentos")({
  component: legacyRouteElements["/equipamentos"],
});
