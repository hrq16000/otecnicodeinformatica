// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildWifiBairroData } from "./wifiTvBairroData";

const RedesWifiAltoXV = () => (
  <ServicoBairroTemplate data={buildWifiBairroData("alto-da-xv")} />
);

export default RedesWifiAltoXV;
