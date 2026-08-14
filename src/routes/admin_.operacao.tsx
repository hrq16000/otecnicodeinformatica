import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/operacao")({
  component: legacyRouteElements["/admin/operacao"],
});
