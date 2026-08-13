// @ts-nocheck
import { ServicoBairroTemplate } from "./ServicoBairroTemplate";
import { buildWifiBairroData } from "./wifiTvBairroData";
const RedesWifiBatel = () => <ServicoBairroTemplate data={buildWifiBairroData("batel")} />;
export default RedesWifiBatel;
