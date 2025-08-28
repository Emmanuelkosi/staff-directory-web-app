export interface CityData {
  country: string;
  geonameid: number;
  name: string;
  subcountry: string;
}

export interface CountryOption {
  value: string;
  label: string;
}

export interface StateOption {
  value: string;
  label: string;
}

const API_URL = 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json';

let cachedData: CityData[] | null = null;

export const fetchWorldCities = async (): Promise<CityData[]> => {
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.statusText}`);
    }
    
    const data = await response.json();
    cachedData = data;
    return data;
  } catch (error) {
    console.error('Error fetching world cities:', error);
    throw error;
  }
};

export const getCountries = (citiesData: CityData[]): CountryOption[] => {
  const uniqueCountries = [...new Set(citiesData.map(city => city.country))]
    .filter(Boolean)
    .sort();
  
  return uniqueCountries.map(country => ({
    value: country,
    label: country
  }));
};

export const getStatesByCountry = (citiesData: CityData[], country: string): StateOption[] => {
  const states = citiesData
    .filter(city => city.country === country && city.subcountry)
    .map(city => city.subcountry);
  
  const uniqueStates = [...new Set(states)]
    .filter(Boolean)
    .sort();
  
  return uniqueStates.map(state => ({
    value: state,
    label: state
  }));
};