import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/valorizacao-do-trabalho-tecnico")({
  component: legacyRouteElements["/valorizacao-do-trabalho-tecnico"],
});
