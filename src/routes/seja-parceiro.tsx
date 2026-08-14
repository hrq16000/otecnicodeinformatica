import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/seja-parceiro")({
  component: legacyRouteElements["/seja-parceiro"],
});
