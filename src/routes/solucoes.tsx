import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/solucoes")({
  component: legacyRouteElements["/solucoes"],
});
