import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/areas-atendidas")({
  component: legacyRouteElements["/areas-atendidas"],
});
