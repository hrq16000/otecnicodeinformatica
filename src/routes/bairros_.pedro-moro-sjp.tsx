import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/pedro-moro-sjp")({
  component: legacyRouteElements["/bairros/pedro-moro-sjp"],
});
