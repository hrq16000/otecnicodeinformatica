import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/del-rey")({
  component: legacyRouteElements["/bairros/del-rey"],
});
