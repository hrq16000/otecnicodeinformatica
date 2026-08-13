// @ts-nocheck
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/organizationJsonLd";

const organizationSchema = buildOrganizationSchema();
const websiteSchema = buildWebSiteSchema();

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
  useJsonLdSlot(SCHEMA_SLOTS.organization, organizationSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.website, websiteSchema, SLOT_PRIORITY.global);
  return null;
};
