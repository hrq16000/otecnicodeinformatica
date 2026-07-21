import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildWifiBairroData } from "./wifiTvBairroData";

const RedesWifiJardimAmericas = () => (
  <ServicoBairroTemplate data={buildWifiBairroData("jardim-das-americas")} />
);

export default RedesWifiJardimAmericas;
