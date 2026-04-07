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
    // Try to get real location, but start with fallback immediately
    const timer = setTimeout(async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const response = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!response.ok) throw new Error("Failed");

        const data = await response.json();
        const detectedCity = data.city || "";
        const isInServiceArea = CURITIBA_REGION_CITIES.some(
          (city) => city.toLowerCase() === detectedCity.toLowerCase()
        );

        if (isInServiceArea) {
          setGeoData({
            city: detectedCity,
            region: data.region || "Paraná",
            isLoading: false,
            error: null,
          });
        }
      } catch {
        // Keep fallback - already set
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return geoData;
};

export { CURITIBA_REGION_CITIES };
