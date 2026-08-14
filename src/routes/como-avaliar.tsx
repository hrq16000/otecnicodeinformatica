import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/como-avaliar")({
  component: legacyRouteElements["/como-avaliar"],
});
