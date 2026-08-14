import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/notebook-nao-liga")({
  component: legacyRouteElements["/problemas/notebook-nao-liga"],
});
