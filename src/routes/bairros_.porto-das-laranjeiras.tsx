import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/porto-das-laranjeiras")({
  component: legacyRouteElements["/bairros/porto-das-laranjeiras"],
});
