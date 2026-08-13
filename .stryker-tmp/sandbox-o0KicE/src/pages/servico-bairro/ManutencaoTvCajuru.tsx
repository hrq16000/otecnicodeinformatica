// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";
const ManutencaoTvCajuru = () => <ServicoBairroTemplate data={buildTvBairroData("cajuru")} />;
export default ManutencaoTvCajuru;
