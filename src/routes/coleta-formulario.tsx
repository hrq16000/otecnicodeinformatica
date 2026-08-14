import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/coleta-formulario")({
  component: legacyRouteElements["/coleta-formulario"],
});
