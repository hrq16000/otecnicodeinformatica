import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/marcas_/$slug")({
  component: legacyRouteElements["/marcas/:slug"],
});
