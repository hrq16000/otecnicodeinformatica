import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/notebook-molhado")({
  component: legacyRouteElements["/problemas/notebook-molhado"],
});
