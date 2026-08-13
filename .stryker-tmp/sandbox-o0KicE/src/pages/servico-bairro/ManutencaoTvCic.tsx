// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";
const ManutencaoTvCic = () => <ServicoBairroTemplate data={buildTvBairroData("cic")} />;
export default ManutencaoTvCic;
