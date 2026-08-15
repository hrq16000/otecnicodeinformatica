import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildWifiBairroData } from "./wifiTvBairroData";

const RedesWifiEcoville = () => (
  <ServicoBairroTemplate data={buildWifiBairroData("ecoville")} />
);

export default RedesWifiEcoville;
