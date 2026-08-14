import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/ordem-de-servico")({
  component: legacyRouteElements["/ordem-de-servico"],
});
