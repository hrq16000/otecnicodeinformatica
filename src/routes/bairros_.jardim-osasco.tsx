import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-osasco")({
  component: legacyRouteElements["/bairros/jardim-osasco"],
});
