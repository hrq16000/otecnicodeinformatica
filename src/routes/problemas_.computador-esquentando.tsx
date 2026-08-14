import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/computador-esquentando")({
  component: legacyRouteElements["/problemas/computador-esquentando"],
});
