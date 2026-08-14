import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/conserto-tv_/$local")({
  component: legacyRouteElements["/conserto-tv/:local"],
});
