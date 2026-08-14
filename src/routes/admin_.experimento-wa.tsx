import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/experimento-wa")({
  component: legacyRouteElements["/admin/experimento-wa"],
});
