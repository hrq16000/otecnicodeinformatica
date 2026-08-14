import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/cheiro-de-queimado")({
  component: legacyRouteElements["/problemas/cheiro-de-queimado"],
});
