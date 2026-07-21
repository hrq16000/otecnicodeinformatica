import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";
const ManutencaoTvCentro = () => <ServicoBairroTemplate data={buildTvBairroData("centro")} />;
export default ManutencaoTvCentro;
