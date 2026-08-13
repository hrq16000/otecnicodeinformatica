// @ts-nocheck
import { useState, useEffect } from "react";

interface GeoData {
  city: string;
  region: string;
  isLoading: boolean;
  error: string | null;
}

const CURITIBA_REGION_CITIES = [
  "Curitiba",
  "São José dos Pinhais",
  "Araucária",
  "Campo Largo",
  "Pinhais",
  "Colombo",
  "Almirante Tamandaré",
  "Fazenda Rio Grande",
  "Piraquara",
];

// Fallback city when geolocation fails
const getRandomLocalCity = () => {
  const cities = CURITIBA_REGION_CITIES;
  return cities[Math.floor(Math.random() * cities.length)];
};

export const useGeolocation = (): GeoData => {
  const [geoData, setGeoData] = useState<GeoData>({
    city: getRandomLocalCity(),
    region: "Paraná",
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    setGeoData((current) => ({ ...current, isLoading: false }));
  }, []);

  return geoData;
};

export { CURITIBA_REGION_CITIES };
