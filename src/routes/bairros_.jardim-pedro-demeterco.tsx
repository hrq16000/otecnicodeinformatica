import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-pedro-demeterco")({
  component: legacyRouteElements["/bairros/jardim-pedro-demeterco"],
});
