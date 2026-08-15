import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/problemas/computador-desliga-sozinho"];

export const Route = createFileRoute("/problemas_/computador-desliga-sozinho")({
  component: RouteComponent,
});
