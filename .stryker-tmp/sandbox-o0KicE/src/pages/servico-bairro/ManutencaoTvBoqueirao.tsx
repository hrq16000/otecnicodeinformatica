// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";
const ManutencaoTvBoqueirao = () => <ServicoBairroTemplate data={buildTvBairroData("boqueirao")} />;
export default ManutencaoTvBoqueirao;
