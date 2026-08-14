import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/ouro-fino")({
  component: legacyRouteElements["/bairros/ouro-fino"],
});
