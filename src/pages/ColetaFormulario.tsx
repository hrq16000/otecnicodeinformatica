import { useEffect, useState, useMemo } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WHATSAPP_NUMBER as WA_NUMBER } from "@/lib/siteConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageCircle, CheckCircle2, Package, ArrowRight, ArrowLeft,
  Clipboard, Tv, Smartphone, Laptop, Radio, Speaker, Monitor,
  HardDrive, AlertTriangle, Clock, Shield, Truck,
} from "lucide-react";
import {
  COLETA_TAXA_MINIMA_LABEL,
  DIAGNOSTICO_VALOR_LABEL,
  PRAZOS,
} from "@/lib/coletaConfig";

const WHATSAPP_NUMBER = WA_NUMBER;

type EquipmentType = "tv" | "celular" | "notebook" | "pc" | "monitor" | "radio" | "som" | "outro";

const EQUIPMENT_OPTIONS: { value: EquipmentType; label: string; icon: typeof Tv }[] = [
  { value: "tv", label: "TV (LED, LCD, Smart, OLED)", icon: Tv },
  { value: "celular", label: "Celular / Smartphone", icon: Smartphone },
  { value: "notebook", label: "Notebook / Laptop", icon: Laptop },
  { value: "pc", label: "Computador Desktop (PC)", icon: HardDrive },
  { value: "monitor", label: "Monitor", icon: Monitor },
  { value: "radio", label: "Rádio", icon: Radio },
  { value: "som", label: "Caixa de Som / Amplificador", icon: Speaker },
  { value: "outro", label: "Outro equipamento", icon: Package },
];

const TV_SIZES = ['24"', '32"', '40"', '42"', '43"', '49"', '50"', '55"', '58"', '60"', '65"', '70"', '75"', '80"', '85"', 'Outro'];
const USAGE_HOURS = ["Menos de 2h/dia", "2 a 5h/dia", "5 a 10h/dia", "Mais de 10h/dia", "Não sei informar"];
const PURCHASE_OPTIONS = ["Novo (comprado em loja)", "Usado (comprado de terceiros)", "Recebido de presente/doação", "Não sei informar"];
const USAGE_TIME = ["Menos de 1 ano", "1 a 2 anos", "2 a 3 anos", "3 a 5 anos", "5 a 10 anos", "Mais de 10 anos", "Não sei informar"];
const PERIODOS = ["Manhã (8h-12h)", "Tarde (13h-18h)", "Noite (18h-20h)", "Qualquer horário"];

interface FormData {
  // Equipment
  equipmentType: EquipmentType | "";
  otherEquipment: string;
  tvSize: string;
  brand: string;
  model: string;
  serialNumber: string;
  usageTime: string;
  usageHours: string;
  purchaseOrigin: string;
  problemDescription: string;
  alreadyTried: string;

  // Personal
  fullName: string;
  cpf: string;
  phone: string;
  email: string;

  // Address
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;

  // Pickup
  receiverName: string;
  receiverPhone: string;
  preferredPeriod: string;
  pickupNotes: string;
}

const initialFormData: FormData = {
  equipmentType: "",
  otherEquipment: "",
  tvSize: "",
  brand: "",
  model: "",
  serialNumber: "",
  usageTime: "",
  usageHours: "",
  purchaseOrigin: "",
  problemDescription: "",
  alreadyTried: "",
  fullName: "",
  cpf: "",
  phone: "",
  email: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  receiverName: "",
  receiverPhone: "",
  preferredPeriod: "",
  pickupNotes: "",
};

const TERMS = [
  {
    id: "taxa",
    text: `Estou ciente da taxa mínima pré-aprovada de ${COLETA_TAXA_MINIMA_LABEL} para coleta, diagnóstico e serviço.`,
  },
  {
    id: "diagnostico",
    text: `Em caso de desistência do reparo, o diagnóstico técnico custa ${DIAGNOSTICO_VALOR_LABEL} e será cobrado.`,
  },
  {
    id: "prazo_rapido",
    text: `Prazo para celular, rádio e caixa de som: ${PRAZOS[0].prazo}.`,
  },
  {
    id: "prazo_longo",
    text: `Prazo para TV, monitor, notebook e PC: ${PRAZOS[1].prazo}.`,
  },
  {
    id: "valor",
    text: "Valor preciso somente após diagnóstico presencial no laboratório. Estimativas por WhatsApp são aproximadas.",
  },
  {
    id: "garantia_transporte",
    text: "O transporte é feito com cuidado, mas equipamentos com danos pré-existentes (tela trincada, carcaça quebrada) devem ser informados.",
  },
  {
    id: "responsabilidade",
    text: "Declaro que sou o proprietário ou responsável legal pelo equipamento informado.",
  },
  {
    id: "dados",
    text: "Autorizo o uso dos meus dados para contato referente ao serviço de assistência técnica.",
  },
];

const ColetaFormulario = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [acceptedTerms, setAcceptedTerms] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Formulário de Coleta — Preencha seus Dados | Técnico Curitiba";
    trackPageView("/coleta-formulario", "Formulário Coleta");
  }, []);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTerm = (id: string) => {
    setAcceptedTerms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allTermsAccepted = TERMS.every((t) => acceptedTerms[t.id]);

  const equipLabel = useMemo(() => {
    if (!form.equipmentType) return "";
    if (form.equipmentType === "outro") return form.otherEquipment || "Outro";
    return EQUIPMENT_OPTIONS.find((e) => e.value === form.equipmentType)?.label || "";
  }, [form.equipmentType, form.otherEquipment]);

  // Validation per step
  const step1Valid =
    form.equipmentType !== "" &&
    form.brand.trim().length >= 2 &&
    form.problemDescription.trim().length >= 10 &&
    form.usageTime !== "" &&
    form.purchaseOrigin !== "" &&
    (form.equipmentType !== "tv" || form.tvSize !== "") &&
    (form.equipmentType !== "outro" || form.otherEquipment.trim().length >= 2);

  const step2Valid =
    form.fullName.trim().length >= 3 &&
    form.phone.trim().length >= 10 &&
    form.street.trim().length >= 3 &&
    form.number.trim().length >= 1 &&
    form.neighborhood.trim().length >= 2 &&
    form.city.trim().length >= 2 &&
    form.preferredPeriod !== "";

  const step3Valid = allTermsAccepted;

  const buildWhatsAppMessage = (): string => {
    const lines = [
      `📋 *FORMULÁRIO DE COLETA E ENTREGA*`,
      ``,
      `🔧 *EQUIPAMENTO*`,
      `• Tipo: ${equipLabel}`,
      form.tvSize ? `• Tamanho: ${form.tvSize}` : "",
      `• Marca: ${form.brand}`,
      form.model ? `• Modelo: ${form.model}` : "",
      form.serialNumber ? `• Nº Série: ${form.serialNumber}` : "",
      `• Tempo de uso: ${form.usageTime}`,
      `• Uso diário: ${form.usageHours || "Não informado"}`,
      `• Origem: ${form.purchaseOrigin}`,
      ``,
      `🔍 *PROBLEMA*`,
      `${form.problemDescription}`,
      form.alreadyTried ? `\n• Já tentou: ${form.alreadyTried}` : "",
      ``,
      `👤 *DADOS DO CLIENTE*`,
      `• Nome: ${form.fullName}`,
      form.cpf ? `• CPF: ${form.cpf}` : "",
      `• Telefone: ${form.phone}`,
      form.email ? `• E-mail: ${form.email}` : "",
      ``,
      `📍 *ENDEREÇO PARA COLETA*`,
      `• ${form.street}, nº ${form.number}${form.complement ? ` - ${form.complement}` : ""}`,
      `• Bairro: ${form.neighborhood}`,
      `• Cidade: ${form.city}`,
      form.cep ? `• CEP: ${form.cep}` : "",
      ``,
      `🕐 *COLETA*`,
      `• Horário preferido: ${form.preferredPeriod}`,
      form.receiverName ? `• Quem vai receber: ${form.receiverName}` : "",
      form.receiverPhone ? `• Tel. de quem recebe: ${form.receiverPhone}` : "",
      form.pickupNotes ? `• Obs: ${form.pickupNotes}` : "",
      ``,
      `✅ *TERMOS ACEITOS:* Todos os ${TERMS.length} termos foram lidos e aceitos.`,
      ``,
      `---`,
      `Formulário enviado pelo site ${SITE_DOMAIN || BRAND_NAME}`,
    ];
    return lines.filter((l) => l !== "").join("\n");
  };

  const handleSubmit = () => {
    trackCTAClick("whatsapp", "coleta-formulario-confirmado");
    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  const stepIndicator = (num: number, label: string) => (
    <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${step >= num ? "text-accent" : "text-muted-foreground"}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step > num ? "bg-accent text-accent-foreground border-accent" : step === num ? "border-accent text-accent" : "border-muted-foreground/30 text-muted-foreground"}`}>
        {step > num ? <CheckCircle2 className="h-4 w-4" /> : num}
      </div>
      <span className="hidden sm:inline">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Formulário de Coleta e Entrega | Técnico Curitiba"
        description="Preencha o formulário para agendar a coleta do seu equipamento. TV, celular, notebook, PC. Curitiba e região."
        path="/coleta-formulario"
      />
      <Header />
      <Breadcrumbs items={[{ label: "Coleta e Entrega", href: "/coleta-e-entrega" }, { label: "Formulário de Coleta" }]} />

      <main className="py-8 md:py-12">
        <div className="container mx-auto max-w-3xl px-4">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
              Formulário de <span className="gradient-text">Coleta e Entrega</span>
            </h1>
            <p className="text-muted-foreground">
              Preencha todos os campos para solicitar a coleta do seu equipamento.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
            {stepIndicator(1, "Equipamento")}
            <div className="w-8 h-px bg-border" />
            {stepIndicator(2, "Seus Dados")}
            <div className="w-8 h-px bg-border" />
            {stepIndicator(3, "Termos & Confirmação")}
          </div>

          {submitted ? (
            <div className="glass-card rounded-xl p-8 text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-accent mx-auto" />
              <h2 className="text-xl font-bold text-foreground">Formulário enviado com sucesso!</h2>
              <p className="text-muted-foreground">
                Seus dados foram organizados e enviados para nosso WhatsApp. Em breve entraremos em contato para confirmar a coleta.
              </p>
              <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); setForm(initialFormData); setAcceptedTerms({}); }}>
                Enviar outro formulário
              </Button>
            </div>
          ) : (
            <div className="glass-card gradient-border rounded-xl p-6 md:p-8">
              {/* ==================== STEP 1 — Equipment ==================== */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Package className="h-5 w-5 text-accent" /> Dados do Equipamento
                  </h2>

                  {/* Equipment type grid */}
                  <div>
                    <Label className="mb-2 block font-medium">Tipo de equipamento *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {EQUIPMENT_OPTIONS.map((eq) => {
                        const Icon = eq.icon;
                        const selected = form.equipmentType === eq.value;
                        return (
                          <button
                            key={eq.value}
                            type="button"
                            onClick={() => updateField("equipmentType", eq.value)}
                            className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${selected ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/50 text-muted-foreground"}`}
                          >
                            <Icon className="h-6 w-6 mx-auto mb-1" />
                            {eq.label.split("(")[0].trim()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {form.equipmentType === "outro" && (
                    <div>
                      <Label>Qual equipamento? *</Label>
                      <Input value={form.otherEquipment} onChange={(e) => updateField("otherEquipment", e.target.value)} placeholder="Ex: Impressora, Projetor, etc." />
                    </div>
                  )}

                  {form.equipmentType === "tv" && (
                    <div>
                      <Label>Tamanho da TV *</Label>
                      <Select value={form.tvSize} onValueChange={(v) => updateField("tvSize", v)}>
                        <SelectTrigger><SelectValue placeholder="Selecione o tamanho" /></SelectTrigger>
                        <SelectContent>
                          {TV_SIZES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Marca *</Label>
                      <Input value={form.brand} onChange={(e) => updateField("brand", e.target.value)} placeholder="Ex: Samsung, Apple, Dell, LG" />
                    </div>
                    <div>
                      <Label>Modelo (se souber)</Label>
                      <Input value={form.model} onChange={(e) => updateField("model", e.target.value)} placeholder="Ex: Galaxy S24, MacBook Pro" />
                    </div>
                  </div>

                  <div>
                    <Label>Número de série (se tiver)</Label>
                    <Input value={form.serialNumber} onChange={(e) => updateField("serialNumber", e.target.value)} placeholder="Geralmente atrás do equipamento" />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Tempo de uso *</Label>
                      <Select value={form.usageTime} onValueChange={(v) => updateField("usageTime", v)}>
                        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          {USAGE_TIME.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Horas de uso/dia</Label>
                      <Select value={form.usageHours} onValueChange={(v) => updateField("usageHours", v)}>
                        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          {USAGE_HOURS.map((h) => (
                            <SelectItem key={h} value={h}>{h}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Comprado *</Label>
                      <Select value={form.purchaseOrigin} onValueChange={(v) => updateField("purchaseOrigin", v)}>
                        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          {PURCHASE_OPTIONS.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Descreva o problema detalhadamente *</Label>
                    <Textarea
                      value={form.problemDescription}
                      onChange={(e) => updateField("problemDescription", e.target.value)}
                      placeholder="O que acontece? Quando começou? O equipamento liga? Há algum som, luz ou mensagem de erro?"
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Mínimo 10 caracteres. Quanto mais detalhes, melhor a avaliação inicial.</p>
                  </div>

                  <div>
                    <Label>Já tentou algum reparo antes?</Label>
                    <Textarea
                      value={form.alreadyTried}
                      onChange={(e) => updateField("alreadyTried", e.target.value)}
                      placeholder="Se já levou em outra assistência ou tentou consertar, descreva o que foi feito."
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setStep(2)} disabled={!step1Valid} className="gap-2">
                      Próximo: Seus Dados <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* ==================== STEP 2 — Personal + Address ==================== */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Clipboard className="h-5 w-5 text-accent" /> Seus Dados e Endereço
                  </h2>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Dados pessoais</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nome completo *</Label>
                        <Input value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Seu nome completo" />
                      </div>
                      <div>
                        <Label>CPF (opcional)</Label>
                        <Input value={form.cpf} onChange={(e) => updateField("cpf", e.target.value)} placeholder="000.000.000-00" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Telefone / WhatsApp *</Label>
                        <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="(41) 99999-9999" />
                      </div>
                      <div>
                        <Label>E-mail (opcional)</Label>
                        <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="seu@email.com" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 space-y-4">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Endereço para coleta</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label>Rua / Avenida *</Label>
                        <Input value={form.street} onChange={(e) => updateField("street", e.target.value)} placeholder="Nome da rua" />
                      </div>
                      <div>
                        <Label>Número *</Label>
                        <Input value={form.number} onChange={(e) => updateField("number", e.target.value)} placeholder="123" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Complemento</Label>
                        <Input value={form.complement} onChange={(e) => updateField("complement", e.target.value)} placeholder="Apto, bloco..." />
                      </div>
                      <div>
                        <Label>Bairro *</Label>
                        <Input value={form.neighborhood} onChange={(e) => updateField("neighborhood", e.target.value)} placeholder="Nome do bairro" />
                      </div>
                      <div>
                        <Label>Cidade *</Label>
                        <Input value={form.city} onChange={(e) => updateField("city", e.target.value)} placeholder="Curitiba" />
                      </div>
                    </div>
                    <div>
                      <Label>CEP (opcional)</Label>
                      <Input value={form.cep} onChange={(e) => updateField("cep", e.target.value)} placeholder="80000-000" />
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 space-y-4">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Informações da coleta</h3>
                    <div>
                      <Label>Horário preferido para coleta *</Label>
                      <Select value={form.preferredPeriod} onValueChange={(v) => updateField("preferredPeriod", v)}>
                        <SelectTrigger><SelectValue placeholder="Selecione o período" /></SelectTrigger>
                        <SelectContent>
                          {PERIODOS.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Quem vai receber o técnico? (se diferente)</Label>
                        <Input value={form.receiverName} onChange={(e) => updateField("receiverName", e.target.value)} placeholder="Nome de quem estará no local" />
                      </div>
                      <div>
                        <Label>Telefone de quem recebe</Label>
                        <Input value={form.receiverPhone || form.phone} onChange={(e) => updateField("receiverPhone", e.target.value)} placeholder="(41) 99999-9999" />
                      </div>
                    </div>
                    <div>
                      <Label>Observações sobre a coleta</Label>
                      <Textarea
                        value={form.pickupNotes}
                        onChange={(e) => updateField("pickupNotes", e.target.value)}
                        placeholder="Ex: Portaria fecha 12h, interfone 202, cachorro no portão..."
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                      <ArrowLeft className="h-4 w-4" /> Voltar
                    </Button>
                    <Button onClick={() => setStep(3)} disabled={!step2Valid} className="gap-2">
                      Próximo: Termos <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* ==================== STEP 3 — Terms + Confirmation ==================== */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" /> Termos, Condições e Confirmação
                  </h2>

                  {/* Summary */}
                  <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                    <h3 className="font-bold text-foreground mb-2">📋 Resumo do seu pedido</h3>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-1">
                      <p><span className="text-muted-foreground">Equipamento:</span> <span className="font-medium text-foreground">{equipLabel}</span></p>
                      {form.tvSize && <p><span className="text-muted-foreground">Tamanho:</span> <span className="font-medium text-foreground">{form.tvSize}</span></p>}
                      <p><span className="text-muted-foreground">Marca:</span> <span className="font-medium text-foreground">{form.brand}</span></p>
                      {form.model && <p><span className="text-muted-foreground">Modelo:</span> <span className="font-medium text-foreground">{form.model}</span></p>}
                      <p><span className="text-muted-foreground">Cliente:</span> <span className="font-medium text-foreground">{form.fullName}</span></p>
                      <p><span className="text-muted-foreground">Telefone:</span> <span className="font-medium text-foreground">{form.phone}</span></p>
                      <p><span className="text-muted-foreground">Endereço:</span> <span className="font-medium text-foreground">{form.street}, {form.number} - {form.neighborhood}, {form.city}</span></p>
                      <p><span className="text-muted-foreground">Horário:</span> <span className="font-medium text-foreground">{form.preferredPeriod}</span></p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-border">
                      <p className="text-muted-foreground">Problema: <span className="text-foreground">{form.problemDescription.slice(0, 120)}{form.problemDescription.length > 120 ? "..." : ""}</span></p>
                    </div>
                  </div>

                  {/* Important notices */}
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-bold text-foreground mb-1">Informações importantes:</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li className="flex items-start gap-1.5">
                            <Clock className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                            Prazos: celular/rádio/som ({PRAZOS[0].prazo}), TV/monitor/notebook/PC ({PRAZOS[1].prazo})
                          </li>
                          <li className="flex items-start gap-1.5">
                            <Truck className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                            Taxa mínima pré-aprovada: {COLETA_TAXA_MINIMA_LABEL} (inclui coleta, diagnóstico e serviço)
                          </li>
                          <li className="flex items-start gap-1.5">
                            <Shield className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                            Diagnóstico em caso de desistência: {DIAGNOSTICO_VALOR_LABEL}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-3">
                    <p className="font-bold text-foreground text-sm">✅ Marque todos os termos para confirmar que você leu e concorda:</p>
                    {TERMS.map((term) => (
                      <label
                        key={term.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${acceptedTerms[term.id] ? "border-accent/50 bg-accent/5" : "border-border hover:border-accent/30"}`}
                      >
                        <Checkbox
                          checked={!!acceptedTerms[term.id]}
                          onCheckedChange={() => toggleTerm(term.id)}
                          className="mt-0.5"
                        />
                        <span className="text-sm text-foreground leading-relaxed">{term.text}</span>
                      </label>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
                    <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                      <ArrowLeft className="h-4 w-4" /> Voltar
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!step3Valid}
                      className="gap-2 bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-white"
                      size="lg"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Confirmar e Enviar via WhatsApp
                    </Button>
                  </div>

                  {!allTermsAccepted && (
                    <p className="text-xs text-muted-foreground text-center">
                      Você precisa aceitar todos os {TERMS.length} termos para enviar o formulário.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ColetaFormulario;
