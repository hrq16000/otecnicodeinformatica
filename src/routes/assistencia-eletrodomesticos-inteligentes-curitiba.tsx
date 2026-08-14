import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/assistencia-eletrodomesticos-inteligentes-curitiba"];

export const Route = createFileRoute("/assistencia-eletrodomesticos-inteligentes-curitiba")({
  component: RouteComponent,
});
