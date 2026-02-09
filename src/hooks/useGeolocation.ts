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
    city: "",
    region: "Paraná",
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Use free IP geolocation API
        const response = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(5000),
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch location");
        }

        const data = await response.json();
        
        // Check if city is in our service area
        const detectedCity = data.city || "";
        const isInServiceArea = CURITIBA_REGION_CITIES.some(
          (city) => city.toLowerCase() === detectedCity.toLowerCase()
        );

        setGeoData({
          city: isInServiceArea ? detectedCity : getRandomLocalCity(),
          region: data.region || "Paraná",
          isLoading: false,
          error: null,
        });
      } catch (error) {
        // Fallback to random local city
        setGeoData({
          city: getRandomLocalCity(),
          region: "Paraná",
          isLoading: false,
          error: null,
        });
      }
    };

    fetchLocation();
  }, []);

  return geoData;
};

export { CURITIBA_REGION_CITIES };
