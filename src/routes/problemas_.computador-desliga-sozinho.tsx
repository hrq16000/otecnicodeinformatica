import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/computador-desliga-sozinho")({
  component: legacyRouteElements["/problemas/computador-desliga-sozinho"],
});
