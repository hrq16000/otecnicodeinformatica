import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/guia-tecnico-informatica")({
  component: legacyRouteElements["/guia-tecnico-informatica"],
});
