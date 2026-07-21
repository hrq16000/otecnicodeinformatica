import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildWifiBairroData } from "./wifiTvBairroData";

const RedesWifiReboucas = () => (
  <ServicoBairroTemplate data={buildWifiBairroData("reboucas")} />
);

export default RedesWifiReboucas;
