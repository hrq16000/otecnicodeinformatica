// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";

const ManutencaoTvJardimAmericas = () => (
  <ServicoBairroTemplate data={buildTvBairroData("jardim-das-americas")} />
);

export default ManutencaoTvJardimAmericas;
