import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/equipamentos_/$slug")({
  component: legacyRouteElements["/equipamentos/:slug"],
});
