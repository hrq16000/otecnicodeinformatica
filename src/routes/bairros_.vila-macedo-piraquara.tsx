import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vila-macedo-piraquara")({
  component: legacyRouteElements["/bairros/vila-macedo-piraquara"],
});
