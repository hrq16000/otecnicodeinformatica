// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";
const ManutencaoTvCabral = () => <ServicoBairroTemplate data={buildTvBairroData("cabral")} />;
export default ManutencaoTvCabral;
