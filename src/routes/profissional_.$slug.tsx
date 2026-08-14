import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/profissional_/$slug")({
  component: legacyRouteElements["/profissional/:slug"],
});
