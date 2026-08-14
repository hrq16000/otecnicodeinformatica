import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/depoimentos")({
  component: legacyRouteElements["/depoimentos"],
});
