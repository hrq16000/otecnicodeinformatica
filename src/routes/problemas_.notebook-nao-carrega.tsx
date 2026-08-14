import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/problemas_/notebook-nao-carrega")({
  component: legacyRouteElements["/problemas/notebook-nao-carrega"],
});
