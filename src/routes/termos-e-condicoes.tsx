import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/termos-e-condicoes")({
  component: legacyRouteElements["/termos-e-condicoes"],
});
