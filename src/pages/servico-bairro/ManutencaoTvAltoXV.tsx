import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";

const ManutencaoTvAltoXV = () => (
  <ServicoBairroTemplate data={buildTvBairroData("alto-da-xv")} />
);

export default ManutencaoTvAltoXV;
