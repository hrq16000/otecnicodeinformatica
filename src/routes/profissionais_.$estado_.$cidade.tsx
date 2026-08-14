import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/profissionais_/$estado_/$cidade")({
  component: legacyRouteElements["/profissionais/:estado/:cidade"],
});
