import { useState, useEffect } from 'react';
import { fetchWorldCities, getCountries, getStatesByCountry, CountryOption, StateOption, CityData } from '@/services/locationService';

export const useLocations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);

  useEffect(() => {
    const loadCities = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchWorldCities();
        setCitiesData(data);
        setCountries(getCountries(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load locations');
      } finally {
        setIsLoading(false);
      }
    };

    loadCities();
  }, []);

  const getStatesForCountry = (country: string): StateOption[] => {
    if (!citiesData.length) return [];
    return getStatesByCountry(citiesData, country);
  };

  return {
    isLoading,
    error,
    countries,
    getStatesForCountry,
  };
};