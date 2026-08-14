import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/conserto-som_/$local")({
  component: legacyRouteElements["/conserto-som/:local"],
});
