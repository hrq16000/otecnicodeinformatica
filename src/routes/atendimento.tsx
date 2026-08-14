import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/atendimento")({
  component: legacyRouteElements["/atendimento"],
});
