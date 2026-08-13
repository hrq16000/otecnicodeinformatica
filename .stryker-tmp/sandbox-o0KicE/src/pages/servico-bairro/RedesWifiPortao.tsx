// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildWifiBairroData } from "./wifiTvBairroData";
const RedesWifiPortao = () => <ServicoBairroTemplate data={buildWifiBairroData("portao")} />;
export default RedesWifiPortao;
