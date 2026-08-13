// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";

const ManutencaoTvEcoville = () => (
  <ServicoBairroTemplate data={buildTvBairroData("ecoville")} />
);

export default ManutencaoTvEcoville;
