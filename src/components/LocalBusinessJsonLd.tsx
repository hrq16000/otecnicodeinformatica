import { useMemo } from "react";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import {
  buildLocalBusinessSchema,
  type LocalBusinessOptions,
} from "@/lib/localBusinessJsonLd";

interface Props extends LocalBusinessOptions {
  /** @deprecated mantido por compatibilidade — o slot `local-business` é a chave real. */
  scriptId?: string;
}

/**
 * Injeta o LocalBusiness canônico (NAP + área atendida + horários) na página.
 * Usa a mesma fonte de verdade em todo o site.
 */
export const LocalBusinessJsonLd = ({
  scriptId: _scriptId,
  ...opts
}: Props) => {
  const schema = useMemo(
    () => buildLocalBusinessSchema(opts),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [opts.path, opts.name, opts.description, JSON.stringify(opts.services), JSON.stringify(opts.areaServed)],
  );
  useJsonLdSlot(SCHEMA_SLOTS.localBusiness, schema, SLOT_PRIORITY.page);
  return null;
};

export default LocalBusinessJsonLd;
