import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/quando-nao-compensa")({
  component: legacyRouteElements["/quando-nao-compensa"],
});
