import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";
const ManutencaoTvBoaVista = () => <ServicoBairroTemplate data={buildTvBairroData("boa-vista")} />;
export default ManutencaoTvBoaVista;
