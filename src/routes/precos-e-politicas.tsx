import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/precos-e-politicas")({
  component: legacyRouteElements["/precos-e-politicas"],
});
