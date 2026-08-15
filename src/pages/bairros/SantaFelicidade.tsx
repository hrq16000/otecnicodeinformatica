import { BairroLocalLayout } from "@/components/bairro/BairroLocalLayout";
import { BAIRROS } from "@/lib/bairrosData";

// RODADA 5E — Lote 2 de bairros âncora. Rota preexistente; conteúdo autoral.
const SantaFelicidade = () => <BairroLocalLayout data={BAIRROS["santa-felicidade"]} />;

export default SantaFelicidade;
