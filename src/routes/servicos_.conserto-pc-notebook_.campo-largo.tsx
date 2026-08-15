import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/conserto-pc-notebook/campo-largo"];

export const Route = createFileRoute("/servicos_/conserto-pc-notebook_/campo-largo")({
  component: RouteComponent,
});
