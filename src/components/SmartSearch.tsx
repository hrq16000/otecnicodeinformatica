import { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, MapPin, Wrench, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchItem {
  title: string;
  path: string;
  category: "servico" | "cidade" | "bairro" | "pagina";
  keywords: string[];
}

const searchData: SearchItem[] = [
  // Serviços
  { title: "Formatação de Computador", path: "/servicos/formatacao-computador", category: "servico", keywords: ["formatar", "windows", "reinstalar", "lento", "formatação"] },
  { title: "Remoção de Vírus", path: "/servicos/remocao-virus", category: "servico", keywords: ["virus", "malware", "trojan", "infectado", "lento", "popup"] },
  { title: "Upgrade SSD e Memória RAM", path: "/servicos/upgrade-ssd-memoria", category: "servico", keywords: ["ssd", "ram", "memória", "lento", "upgrade", "hd"] },
  { title: "Conserto de PC e Notebook", path: "/servicos/conserto-pc-notebook", category: "servico", keywords: ["conserto", "notebook", "pc", "desktop", "não liga", "quebrado"] },
  { title: "Computador Lento", path: "/servicos/computador-lento", category: "servico", keywords: ["lento", "travando", "demora", "devagar"] },
  { title: "Computador Não Liga", path: "/servicos/computador-nao-liga", category: "servico", keywords: ["não liga", "desligado", "morto", "tela preta"] },
  { title: "Conserto de TV", path: "/servicos/conserto-tv", category: "servico", keywords: ["tv", "televisão", "tela", "lcd", "led", "smart tv", "não liga"] },
  { title: "Conserto de Celular", path: "/servicos/conserto-celular", category: "servico", keywords: ["celular", "smartphone", "iphone", "samsung", "tela quebrada", "bateria"] },
  { title: "Manutenção de TV", path: "/servicos/manutencao-tv", category: "servico", keywords: ["tv", "manutenção", "televisão"] },
  { title: "Conserto de Placa", path: "/servicos/conserto-placa", category: "servico", keywords: ["placa", "mãe", "placa-mãe", "componente"] },
  { title: "Montagem de PC", path: "/servicos/montagem-pc", category: "servico", keywords: ["montar", "montagem", "pc gamer", "desktop", "personalizado"] },
  { title: "Redes e Wi-Fi", path: "/servicos/redes-wifi", category: "servico", keywords: ["wifi", "wi-fi", "rede", "internet", "roteador", "cabo", "sem sinal"] },
  { title: "Backup e Recuperação de Dados", path: "/servicos/backup-recuperacao", category: "servico", keywords: ["backup", "dados", "recuperar", "arquivo", "perdido", "hd"] },
  { title: "CFTV / Câmeras de Segurança", path: "/cftv", category: "servico", keywords: ["câmera", "cftv", "segurança", "vigilância", "monitoramento"] },

  // Cidades
  { title: "Técnico em Curitiba", path: "/tecnico-informatica-curitiba", category: "cidade", keywords: ["curitiba", "ctba"] },
  { title: "Técnico em São José dos Pinhais", path: "/tecnico-informatica-sao-jose-pinhais", category: "cidade", keywords: ["são josé", "sjp", "pinhais"] },
  { title: "Técnico em Araucária", path: "/tecnico-informatica-araucaria", category: "cidade", keywords: ["araucária"] },
  { title: "Técnico em Colombo", path: "/tecnico-informatica-colombo", category: "cidade", keywords: ["colombo"] },
  { title: "Técnico em Pinhais", path: "/tecnico-informatica-pinhais", category: "cidade", keywords: ["pinhais"] },
  { title: "Técnico em Campo Largo", path: "/tecnico-informatica-campo-largo", category: "cidade", keywords: ["campo largo"] },
  { title: "Técnico em Fazenda Rio Grande", path: "/tecnico-informatica-fazenda-rio-grande", category: "cidade", keywords: ["fazenda rio grande", "frg"] },
  { title: "Técnico em Almirante Tamandaré", path: "/tecnico-informatica-almirante-tamandare", category: "cidade", keywords: ["tamandaré", "almirante"] },
  { title: "Técnico em Piraquara", path: "/tecnico-informatica-piraquara", category: "cidade", keywords: ["piraquara"] },
  { title: "Técnico em Campo Magro", path: "/tecnico-informatica-campo-magro", category: "cidade", keywords: ["campo magro"] },
  { title: "Técnico em Quatro Barras", path: "/tecnico-informatica-quatro-barras", category: "cidade", keywords: ["quatro barras"] },

  // Bairros de Curitiba
  { title: "Técnico no Centro – Curitiba", path: "/bairros/centro", category: "bairro", keywords: ["centro", "curitiba"] },
  { title: "Técnico no Batel – Curitiba", path: "/bairros/batel", category: "bairro", keywords: ["batel", "curitiba"] },
  { title: "Técnico no Portão – Curitiba", path: "/bairros/portao", category: "bairro", keywords: ["portão", "curitiba"] },
  { title: "Técnico em Santa Felicidade – Curitiba", path: "/bairros/santa-felicidade", category: "bairro", keywords: ["santa felicidade", "curitiba"] },
  { title: "Técnico na Água Verde – Curitiba", path: "/bairros/agua-verde", category: "bairro", keywords: ["água verde", "curitiba"] },
  { title: "Técnico no Bigorrilho – Curitiba", path: "/bairros/bigorrilho", category: "bairro", keywords: ["bigorrilho", "curitiba"] },
  { title: "Técnico no CIC – Curitiba", path: "/bairros/cic", category: "bairro", keywords: ["cic", "cidade industrial", "curitiba"] },
  { title: "Técnico no Cajuru – Curitiba", path: "/bairros/cajuru", category: "bairro", keywords: ["cajuru", "curitiba"] },
  { title: "Técnico no Boqueirão – Curitiba", path: "/bairros/boqueirao", category: "bairro", keywords: ["boqueirão", "curitiba"] },
  { title: "Técnico no Xaxim – Curitiba", path: "/bairros/xaxim", category: "bairro", keywords: ["xaxim", "curitiba"] },
  { title: "Técnico no Pinheirinho – Curitiba", path: "/bairros/pinheirinho", category: "bairro", keywords: ["pinheirinho", "curitiba"] },
  { title: "Técnico no Uberaba – Curitiba", path: "/bairros/uberaba", category: "bairro", keywords: ["uberaba", "curitiba"] },
  { title: "Técnico no Hauer – Curitiba", path: "/bairros/hauer", category: "bairro", keywords: ["hauer", "curitiba"] },
  { title: "Técnico no Bacacheri – Curitiba", path: "/bairros/bacacheri", category: "bairro", keywords: ["bacacheri", "curitiba"] },
  { title: "Técnico no Rebouças – Curitiba", path: "/bairros/reboucas", category: "bairro", keywords: ["rebouças", "curitiba"] },
  { title: "Técnico no Seminário – Curitiba", path: "/bairros/seminario", category: "bairro", keywords: ["seminário", "curitiba"] },
  { title: "Técnico no Campo Comprido – Curitiba", path: "/bairros/campo-comprido", category: "bairro", keywords: ["campo comprido", "curitiba"] },
  { title: "Técnico no Alto da Glória – Curitiba", path: "/bairros/alto-da-gloria", category: "bairro", keywords: ["alto da glória", "curitiba"] },
  { title: "Técnico na Vila Izabel – Curitiba", path: "/bairros/vila-izabel", category: "bairro", keywords: ["vila izabel", "curitiba"] },
  { title: "Técnico no Hugo Lange – Curitiba", path: "/bairros/hugo-lange", category: "bairro", keywords: ["hugo lange", "curitiba"] },
  { title: "Técnico no Novo Mundo – Curitiba", path: "/bairros/novo-mundo", category: "bairro", keywords: ["novo mundo", "curitiba"] },
  { title: "Técnico no Sítio Cercado – Curitiba", path: "/bairros/sitio-cercado", category: "bairro", keywords: ["sítio cercado", "curitiba"] },
  { title: "Técnico no Tarumã – Curitiba", path: "/bairros/taruma", category: "bairro", keywords: ["tarumã", "curitiba"] },

  // Bairros de SJP
  { title: "Técnico no Centro – SJP", path: "/bairros/centro-sjp", category: "bairro", keywords: ["centro", "sjp", "são josé"] },
  { title: "Técnico no Afonso Pena – SJP", path: "/bairros/afonso-pena", category: "bairro", keywords: ["afonso pena", "sjp", "aeroporto"] },
  { title: "Técnico no Guatupê – SJP", path: "/bairros/guatupe", category: "bairro", keywords: ["guatupê", "sjp"] },

  // Bairros de Colombo
  { title: "Técnico no Centro – Colombo", path: "/bairros/centro-colombo", category: "bairro", keywords: ["centro", "colombo"] },
  { title: "Técnico no Maracanã – Colombo", path: "/bairros/maracana-colombo", category: "bairro", keywords: ["maracanã", "colombo"] },

  // Bairros de Pinhais
  { title: "Técnico no Centro – Pinhais", path: "/bairros/centro-pinhais", category: "bairro", keywords: ["centro", "pinhais"] },

  // Páginas gerais
  { title: "Como Funciona o Atendimento", path: "/como-funciona", category: "pagina", keywords: ["como funciona", "atendimento", "processo"] },
  { title: "Preços e Políticas", path: "/precos-e-politicas", category: "pagina", keywords: ["preço", "valor", "quanto custa", "tabela", "política"] },
  { title: "Diagnóstico Técnico", path: "/diagnostico-tecnico", category: "pagina", keywords: ["diagnóstico", "avaliação", "orçamento"] },
  { title: "Atendimento a Domicílio", path: "/atendimento-domicilio", category: "pagina", keywords: ["domicílio", "casa", "residência", "visita"] },
  { title: "Coleta e Entrega", path: "/coleta-e-entrega", category: "pagina", keywords: ["coleta", "entrega", "buscar", "levar"] },
  { title: "Atendimento Remoto", path: "/atendimento-remoto", category: "pagina", keywords: ["remoto", "online", "distância", "teamviewer"] },
  { title: "Suporte para Empresas", path: "/suporte-empresas", category: "pagina", keywords: ["empresa", "corporativo", "contrato", "mensal"] },
  { title: "Blog", path: "/blog", category: "pagina", keywords: ["blog", "artigo", "dicas", "tutorial"] },
  { title: "FAQ – Perguntas Frequentes", path: "/faq", category: "pagina", keywords: ["faq", "pergunta", "dúvida", "ajuda"] },
  { title: "Sobre Nós", path: "/sobre", category: "pagina", keywords: ["sobre", "quem somos", "história"] },
  { title: "Contato", path: "/contato", category: "pagina", keywords: ["contato", "telefone", "endereço", "email"] },
  { title: "Equipamentos Atendidos", path: "/equipamentos-atendidos", category: "pagina", keywords: ["equipamento", "marca", "modelo", "notebook", "desktop"] },
];

const normalize = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const categoryIcon = {
  servico: Wrench,
  cidade: MapPin,
  bairro: MapPin,
  pagina: FileText,
};

const categoryLabel = {
  servico: "Serviço",
  cidade: "Cidade",
  bairro: "Bairro",
  pagina: "Página",
};

interface SmartSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartSearch = ({ isOpen, onClose }: SmartSearchProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = normalize(query);
    const words = q.split(/\s+/).filter(Boolean);

    return searchData
      .map((item) => {
        const titleNorm = normalize(item.title);
        const keywordsNorm = item.keywords.map(normalize);
        let score = 0;

        for (const word of words) {
          if (titleNorm.includes(word)) score += 10;
          if (titleNorm.startsWith(word)) score += 5;
          for (const kw of keywordsNorm) {
            if (kw.includes(word)) score += 5;
            if (kw === word) score += 8;
          }
        }
        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && results[selectedIndex]) {
        navigate(results[selectedIndex].path);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleGlobal = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent("openSmartSearch"));
      }
    };
    window.addEventListener("keydown", handleGlobal);
    return () => window.removeEventListener("keydown", handleGlobal);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl mx-4 bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar serviço, bairro ou cidade..."
            className="flex-1 bg-transparent text-foreground text-base outline-none placeholder:text-muted-foreground"
            autoComplete="off"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md border border-border">
            ESC
          </kbd>
          <button onClick={onClose} className="sm:hidden p-1 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="max-h-[50vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="px-5 py-10 text-center text-muted-foreground">
              <p className="text-sm">Nenhum resultado para "<strong className="text-foreground">{query}</strong>"</p>
              <p className="text-xs mt-1">Tente buscar por "formatação", "batel" ou "conserto de tv"</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((item, i) => {
                const Icon = categoryIcon[item.category];
                return (
                  <button
                    key={item.path}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                      i === selectedIndex
                        ? "bg-accent/10 text-accent"
                        : "text-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => { navigate(item.path); onClose(); }}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <Icon className={`h-4 w-4 flex-shrink-0 ${i === selectedIndex ? "text-accent" : "text-muted-foreground"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{categoryLabel[item.category]}</p>
                    </div>
                    <ArrowRight className={`h-3.5 w-3.5 flex-shrink-0 transition-opacity ${i === selectedIndex ? "opacity-100" : "opacity-0"}`} />
                  </button>
                );
              })}
            </div>
          )}

          {!query.trim() && (
            <div className="px-5 py-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">Buscas populares</p>
              <div className="flex flex-wrap gap-2">
                {["Formatação", "Conserto de TV", "Vírus", "Batel", "SSD", "Wi-Fi", "Notebook", "Celular"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-border bg-muted/30 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border text-[10px]">↑↓</kbd> navegar
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border text-[10px]">Enter</kbd> abrir
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border text-[10px]">Ctrl+K</kbd> buscar
          </span>
        </div>
      </div>
    </div>
  );
};
