// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";
const ManutencaoTvCristoRei = () => <ServicoBairroTemplate data={buildTvBairroData("cristo-rei")} />;
export default ManutencaoTvCristoRei;
