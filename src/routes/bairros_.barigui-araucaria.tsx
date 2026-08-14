import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/barigui-araucaria")({
  component: legacyRouteElements["/bairros/barigui-araucaria"],
});
