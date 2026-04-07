import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock, MapPin, Wrench, User, Phone, MessageSquare, CheckCircle2, ArrowRight, Send } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const services = [
  { value: "formatacao", label: "Formatação de Computador", icon: "💻" },
  { value: "conserto-notebook", label: "Conserto de Notebook", icon: "🔧" },
  { value: "remocao-virus", label: "Remoção de Vírus", icon: "🛡️" },
  { value: "upgrade-ssd", label: "Upgrade SSD e Memória", icon: "⚡" },
  { value: "manutencao-notebook", label: "Manutenção de Notebook", icon: "🔩" },
  { value: "rede-wifi", label: "Instalação de Rede WiFi", icon: "📶" },
  { value: "backup", label: "Backup e Recuperação", icon: "💾" },
  { value: "montagem-pc", label: "Montagem de PC Gamer", icon: "🎮" },
  { value: "suporte-empresas", label: "Suporte para Empresas", icon: "🏢" },
  { value: "outro", label: "Outro Serviço", icon: "❓" },
];

const regions = [
  { value: "curitiba-centro", label: "Curitiba - Centro" },
  { value: "curitiba-batel", label: "Curitiba - Batel" },
  { value: "curitiba-portao", label: "Curitiba - Portão" },
  { value: "curitiba-cic", label: "Curitiba - CIC" },
  { value: "curitiba-santa-felicidade", label: "Curitiba - Santa Felicidade" },
  { value: "curitiba-outro", label: "Curitiba - Outro bairro" },
  { value: "sjp", label: "São José dos Pinhais" },
  { value: "araucaria", label: "Araucária" },
  { value: "campo-largo", label: "Campo Largo" },
  { value: "pinhais", label: "Pinhais" },
  { value: "outra", label: "Outra cidade" },
];

const timeSlots = [
  { value: "08:00", label: "08:00 - 09:00" },
  { value: "09:00", label: "09:00 - 10:00" },
  { value: "10:00", label: "10:00 - 11:00" },
  { value: "11:00", label: "11:00 - 12:00" },
  { value: "13:00", label: "13:00 - 14:00" },
  { value: "14:00", label: "14:00 - 15:00" },
  { value: "15:00", label: "15:00 - 16:00" },
  { value: "16:00", label: "16:00 - 17:00" },
  { value: "17:00", label: "17:00 - 18:00" },
];

export const SchedulingModal = ({ isOpen, onClose, initialService }: SchedulingModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: initialService || "",
    region: "",
    date: undefined as Date | undefined,
    time: "",
    description: "",
  });

  const updateFormData = (field: string, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStep1Complete = formData.service && formData.region;
  const isStep2Complete = formData.date && formData.time;
  const isStep3Complete = formData.name && formData.phone;

  const handleWhatsAppSubmit = () => {
    const serviceLabel = services.find((s) => s.value === formData.service)?.label || formData.service;
    const regionLabel = regions.find((r) => r.value === formData.region)?.label || formData.region;
    const dateFormatted = formData.date ? format(formData.date, "dd/MM/yyyy", { locale: ptBR }) : "";

    const message = `🗓️ *AGENDAMENTO ONLINE - TÉCNICO CURITIBA*

👤 *Nome:* ${formData.name}
📱 *Telefone:* ${formData.phone}

🔧 *Serviço:* ${serviceLabel}
📍 *Região:* ${regionLabel}
📅 *Data preferida:* ${dateFormatted}
⏰ *Horário:* ${formData.time}

📝 *Descrição do problema:*
${formData.description || "Não informado"}

---
Aguardo confirmação do agendamento.
Li e concordo com a política de preços (A partir de R$ 69,99).`;

    trackCTAClick("whatsapp", `agendamento_${formData.service}`);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    onClose();
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: "",
      phone: "",
      service: initialService || "",
      region: "",
      date: undefined,
      time: "",
      description: "",
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Agendar Atendimento Técnico
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Assistência técnica em informática a domicílio em Curitiba
          </p>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "w-16 sm:w-24 h-1 mx-2 rounded",
                    step > s ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Service & Region */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Wrench className="h-4 w-4 text-primary" />
                Qual serviço você precisa?
              </Label>
              <Select value={formData.service} onValueChange={(v) => updateFormData("service", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      <span className="flex items-center gap-2">
                        <span>{s.icon}</span>
                        <span>{s.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                Onde você está localizado?
              </Label>
              <Select value={formData.region} onValueChange={(v) => updateFormData("region", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua região" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              disabled={!isStep1Complete}
              onClick={() => setStep(2)}
            >
              Próximo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                Escolha a data preferida
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date
                      ? format(formData.date, "PPP", { locale: ptBR })
                      : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(d) => updateFormData("date", d)}
                    disabled={(date) =>
                      date < new Date() || date.getDay() === 0
                    }
                    locale={ptBR}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                Horário preferido
              </Label>
              <Select value={formData.time} onValueChange={(v) => updateFormData("time", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Voltar
              </Button>
              <Button
                className="flex-1"
                disabled={!isStep2Complete}
                onClick={() => setStep(3)}
              >
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-primary" />
                Seu nome completo
              </Label>
              <Input
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-primary" />
                WhatsApp para contato
              </Label>
              <Input
                placeholder="(41) 99999-9999"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Descreva o problema (opcional)
              </Label>
              <Textarea
                placeholder="Ex: Notebook lento, tela azul, vírus..."
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                rows={3}
              />
            </div>

            {/* Summary */}
            <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-sm">
              <p className="font-medium">📋 Resumo do agendamento:</p>
              <p>🔧 {services.find((s) => s.value === formData.service)?.label}</p>
              <p>📍 {regions.find((r) => r.value === formData.region)?.label}</p>
              {formData.date && (
                <p>📅 {format(formData.date, "PPP", { locale: ptBR })} às {formData.time}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Voltar
              </Button>
              <Button
                className="flex-1 bg-whatsapp hover:bg-whatsapp-hover"
                disabled={!isStep3Complete}
                onClick={handleWhatsAppSubmit}
              >
                <Send className="mr-2 h-4 w-4" />
                Enviar via WhatsApp
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              💰 Visita técnica: A partir de R$ 69,99 • Orçamento sem compromisso
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
