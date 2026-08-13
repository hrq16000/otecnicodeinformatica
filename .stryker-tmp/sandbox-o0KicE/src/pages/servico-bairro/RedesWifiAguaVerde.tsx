// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildWifiBairroData } from "./wifiTvBairroData";
const RedesWifiAguaVerde = () => <ServicoBairroTemplate data={buildWifiBairroData("agua-verde")} />;
export default RedesWifiAguaVerde;
