import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildWifiBairroData } from "./wifiTvBairroData";
const RedesWifiCentro = () => <ServicoBairroTemplate data={buildWifiBairroData("centro")} />;
export default RedesWifiCentro;
