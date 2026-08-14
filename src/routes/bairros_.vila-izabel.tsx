import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vila-izabel")({
  component: legacyRouteElements["/bairros/vila-izabel"],
});
