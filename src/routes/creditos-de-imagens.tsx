import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/creditos-de-imagens")({
  component: legacyRouteElements["/creditos-de-imagens"],
});
