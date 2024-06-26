import axios from 'axios';

const API_KEY = 'your_openweathermap_api_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export interface WeatherData {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

export const getWeather = (city: string) => {
  return axios.get<WeatherData>(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
};
