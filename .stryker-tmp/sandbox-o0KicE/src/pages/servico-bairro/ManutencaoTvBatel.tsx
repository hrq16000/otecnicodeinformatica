// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";
const ManutencaoTvBatel = () => <ServicoBairroTemplate data={buildTvBairroData("batel")} />;
export default ManutencaoTvBatel;
