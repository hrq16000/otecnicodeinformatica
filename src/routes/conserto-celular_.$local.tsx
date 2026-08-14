import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/conserto-celular_/$local")({
  component: legacyRouteElements["/conserto-celular/:local"],
});
