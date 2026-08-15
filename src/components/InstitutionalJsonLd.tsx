import { useMemo } from "react";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/organizationJsonLd";

/**
 * Identidade institucional do documento (Organization + WebSite).
 *
 * Montado na raiz da aplicação — e não no Footer — para que TODA rota
 * (inclusive páginas sem rodapé, como /diagnostico-60s) tenha exatamente
 * um nó `#organization`. Assim nenhuma referência `publisher`/`provider`/
 * `parentOrganization` fica quebrada, e o documento permanece idêntico
 * entre prerender estático e cliente.
 */
export const InstitutionalJsonLd = () => {
  const organizationSchema = useMemo(() => buildOrganizationSchema(), []);
  const websiteSchema = useMemo(() => buildWebSiteSchema(), []);

  useJsonLdSlot(SCHEMA_SLOTS.organization, organizationSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.website, websiteSchema, SLOT_PRIORITY.global);
  return null;
};

export default InstitutionalJsonLd;
