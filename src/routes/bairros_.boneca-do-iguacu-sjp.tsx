import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/boneca-do-iguacu-sjp")({
  component: legacyRouteElements["/bairros/boneca-do-iguacu-sjp"],
});
