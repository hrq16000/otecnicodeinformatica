import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";
const ManutencaoTvPortao = () => <ServicoBairroTemplate data={buildTvBairroData("portao")} />;
export default ManutencaoTvPortao;
