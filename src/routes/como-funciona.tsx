import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/como-funciona")({
  component: legacyRouteElements["/como-funciona"],
});
