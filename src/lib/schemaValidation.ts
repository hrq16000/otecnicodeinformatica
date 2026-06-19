/**
 * Validação de JSON-LD antes de injetar no <head>.
 *
 * Objetivos:
 *  - Bloquear schemas malformados (campos obrigatórios faltando)
 *  - Garantir AggregateRating SÓ com reviewCount >= MIN_REVIEWS
 *  - Avisar em dev quando algo está inconsistente (Google + Bing)
 *
 * Uso:
 *   const { valid, errors } = validateSchema(schema);
 *   if (valid) injectJsonLd(id, schema);
 */

export const MIN_REVIEWS_FOR_AGGREGATE = 5;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

type JsonLd = Record<string, unknown> & { "@type"?: string | string[] };

const hasType = (s: JsonLd, t: string) => {
  const ty = s["@type"];
  return Array.isArray(ty) ? ty.includes(t) : ty === t;
};

const req = (
  schema: JsonLd,
  field: string,
  errors: string[],
  label = field,
) => {
  if (
    schema[field] === undefined ||
    schema[field] === null ||
    schema[field] === ""
  ) {
    errors.push(`${getTypeLabel(schema)}: campo obrigatório ausente "${label}"`);
  }
};

const getTypeLabel = (s: JsonLd) => {
  const t = s["@type"];
  return Array.isArray(t) ? t.join("/") : (t ?? "Schema");
};

export function validateSchema(schema: JsonLd): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!schema["@context"]) errors.push("Falta @context (https://schema.org)");
  if (!schema["@type"]) errors.push("Falta @type");

  // LocalBusiness / Organization
  if (hasType(schema, "LocalBusiness") || hasType(schema, "Organization")) {
    req(schema, "name", errors);
    req(schema, "url", errors);
    if (hasType(schema, "LocalBusiness")) {
      req(schema, "telephone", errors);
      if (!schema.areaServed) warnings.push("LocalBusiness sem areaServed");
    }
  }

  // Service
  if (hasType(schema, "Service")) {
    req(schema, "name", errors);
    req(schema, "description", errors);
    const provider = schema.provider as { "@id"?: string } | undefined;
    if (!provider?.["@id"])
      errors.push("Service.provider.@id é obrigatório (referência ao LocalBusiness)");
  }

  // FAQPage
  if (hasType(schema, "FAQPage")) {
    const main = schema.mainEntity as Array<{
      name?: string;
      acceptedAnswer?: { text?: string };
    }> | undefined;
    if (!Array.isArray(main) || main.length < 3)
      errors.push("FAQPage exige mainEntity com >= 3 perguntas");
    main?.forEach((q, i) => {
      if (!q.name) errors.push(`FAQPage.mainEntity[${i}].name ausente`);
      if (!q.acceptedAnswer?.text)
        errors.push(`FAQPage.mainEntity[${i}].acceptedAnswer.text ausente`);
    });
  }

  // BreadcrumbList
  if (hasType(schema, "BreadcrumbList")) {
    const items = schema.itemListElement as unknown[] | undefined;
    if (!Array.isArray(items) || items.length < 2)
      errors.push("BreadcrumbList exige >= 2 itemListElement");
  }

  // Review individual
  if (hasType(schema, "Review")) {
    req(schema, "author", errors);
    req(schema, "reviewRating", errors);
    req(schema, "itemReviewed", errors);
  }

  // HowTo
  if (hasType(schema, "HowTo")) {
    req(schema, "name", errors);
    const steps = schema.step as unknown[] | undefined;
    if (!Array.isArray(steps) || steps.length < 2)
      errors.push("HowTo exige >= 2 steps");
  }

  // AggregateRating embarcado
  const agg = schema.aggregateRating as
    | { ratingValue?: number; reviewCount?: number }
    | undefined;
  if (agg) {
    const count = Number(agg.reviewCount ?? 0);
    const value = Number(agg.ratingValue ?? 0);
    if (count < MIN_REVIEWS_FOR_AGGREGATE) {
      errors.push(
        `AggregateRating bloqueado: reviewCount=${count} < mínimo ${MIN_REVIEWS_FOR_AGGREGATE}. ` +
          `Google pode aplicar manual action por dados fake.`,
      );
    }
    if (value < 1 || value > 5) {
      errors.push(`AggregateRating.ratingValue inválido: ${value} (esperado 1-5)`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Injeta JSON-LD no <head> apenas se passar na validação.
 * Em dev mode loga errors/warnings no console.
 */
export function validateAndInjectSchema(
  scriptId: string,
  schema: JsonLd,
): boolean {
  const { valid, errors, warnings } = validateSchema(schema);
  const isDev = import.meta.env?.DEV;

  if (warnings.length && isDev) {
    console.warn(`[JSON-LD ${scriptId}] avisos:`, warnings);
  }
  if (!valid) {
    if (isDev) {
      console.error(`[JSON-LD ${scriptId}] inválido — não injetado:`, errors);
    }
    document.getElementById(scriptId)?.remove();
    return false;
  }

  document.getElementById(scriptId)?.remove();
  const el = document.createElement("script");
  el.id = scriptId;
  el.type = "application/ld+json";
  el.text = JSON.stringify(schema);
  document.head.appendChild(el);
  return true;
}

/** Hook React: injeta + remove na desmontagem, com validação. */
import { useEffect } from "react";
export function useValidatedJsonLd(scriptId: string, schema: JsonLd | null) {
  useEffect(() => {
    if (!schema) return;
    validateAndInjectSchema(scriptId, schema);
    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [scriptId, schema]);
}
