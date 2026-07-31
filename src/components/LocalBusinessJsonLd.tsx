import { useMemo } from "react";
import { useValidatedJsonLd } from "@/lib/schemaValidation";
import {
  buildLocalBusinessSchema,
  type LocalBusinessOptions,
} from "@/lib/localBusinessJsonLd";

interface Props extends LocalBusinessOptions {
  /** id do <script> injetado (único por página). */
  scriptId?: string;
}

/**
 * Injeta o LocalBusiness canônico (NAP + área atendida + horários) na página.
 * Usa a mesma fonte de verdade em todo o site.
 */
export const LocalBusinessJsonLd = ({
  scriptId = "ld-localbusiness-page",
  ...opts
}: Props) => {
  const schema = useMemo(
    () => buildLocalBusinessSchema(opts),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [opts.path, opts.name, opts.description, JSON.stringify(opts.services), JSON.stringify(opts.areaServed)],
  );
  useValidatedJsonLd(scriptId, schema);
  return null;
};

export default LocalBusinessJsonLd;
