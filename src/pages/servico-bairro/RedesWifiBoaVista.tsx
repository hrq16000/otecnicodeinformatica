import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildWifiBairroData } from "./wifiTvBairroData";
const RedesWifiBoaVista = () => <ServicoBairroTemplate data={buildWifiBairroData("boa-vista")} />;
export default RedesWifiBoaVista;
