import { BairroLocalLayout } from "@/components/bairro/BairroLocalLayout";
import { BAIRROS } from "@/lib/bairrosData";

// RODADA 5E — Lote 2 de bairros âncora. Rota preexistente; conteúdo autoral.
const Costeira = () => <BairroLocalLayout data={BAIRROS["costeira"]} />;

export default Costeira;
