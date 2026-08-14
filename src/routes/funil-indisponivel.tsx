import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/funil-indisponivel")({
  component: legacyRouteElements["/funil-indisponivel"],
});
