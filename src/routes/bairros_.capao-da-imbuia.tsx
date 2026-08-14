import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/capao-da-imbuia")({
  component: legacyRouteElements["/bairros/capao-da-imbuia"],
});
