import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/faq"];

export const Route = createFileRoute("/faq")({
  component: RouteComponent,
});
