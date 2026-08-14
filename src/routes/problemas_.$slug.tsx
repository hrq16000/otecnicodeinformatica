import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/$slug")({
  component: legacyRouteElements["/problemas/:slug"],
});
