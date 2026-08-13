// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";

const ManutencaoTvReboucas = () => (
  <ServicoBairroTemplate data={buildTvBairroData("reboucas")} />
);

export default ManutencaoTvReboucas;
