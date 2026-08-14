import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/computador-lento")({
  component: legacyRouteElements["/problemas/computador-lento"],
});
