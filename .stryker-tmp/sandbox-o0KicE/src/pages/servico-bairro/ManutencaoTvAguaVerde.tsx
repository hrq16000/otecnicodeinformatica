// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildTvBairroData } from "./wifiTvBairroData";
const ManutencaoTvAguaVerde = () => <ServicoBairroTemplate data={buildTvBairroData("agua-verde")} />;
export default ManutencaoTvAguaVerde;
