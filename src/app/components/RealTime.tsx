
{/* 
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeatherData {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  cloudCover: number;
  precipitationIntensity: number;
  precipitationType: string;
}

const RealTimeWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      let retryCount = 0;
      const maxRetries = 5;
      const retryDelay = 1000; // 1 second

      while (retryCount < maxRetries) {
        try {
          const response: AxiosResponse<{
            data: {
              instant: {
                details: WeatherData;
              };
            };
          }> = await axios.get('https://api.tomorrow.io/v4/weather/realtime', {
            params: {
              location: '40.730610,-73.935242',
              fields: [
                'temperature',
                'windSpeed',
                'windDirection',
                'humidity',
                'pressure',
                'cloudCover',
                'precipitationIntensity',
                'precipitationType',
              ],
              units: 'metric',
              apikey: '2xPYMPgFbcLS5Y2QLr9VOSav8TZbtN5N',
            },
          });

          setWeatherData(response.data.data.instant.details);
          return; // Exit the loop if the request is successful
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 429) {
              // Retry the request after a delay
              retryCount++;
              console.log(`Retrying request (attempt ${retryCount})`);
              await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, retryCount - 1))); // Exponential backoff
              continue;
            } else {
              setError(axiosError.message);
              return;
            }
          } else {
            setError('An unknown error occurred');
            return;
          }
        }
      }

      // Maximum retry attempts reached
      setError('Maximum retry attempts reached. Unable to fetch weather data.');
    };

    fetchWeatherData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <LineChart data={weatherData}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <Line type="monotone" dataKey="windSpeed" stroke="#82ca9d" />
          <Line type="monotone" dataKey="humidity" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeWeather;*/}

//  '2xPYMPgFbcLS5Y2QLr9VOSav8TZbtN5N'

// af06d6137bc84898b0a212500242706

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';

const API_KEY = 'af06d6137bc84898b0a212500242706';
const LOCATION = 'London';

interface CurrentWeatherData {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface ForecastWeatherData {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
}
const WeatherApp: React.FC = () => {
    const [forecastWeatherData, setForecastWeatherData] = useState<ForecastWeatherData[] | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
            const currentResponse: AxiosResponse<{ current: CurrentWeatherData }> = await axios.get(
                `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${LOCATION}&aqi=no`
              );
              setCurrentWeatherData(currentResponse.data.current);
          const forecastResponse: AxiosResponse<{ forecast: { forecastday: ForecastWeatherData[] } }> = await axios.get(
            `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION}&days=3&aqi=no&alerts=no`
          );
          setForecastWeatherData(forecastResponse.data.forecast.forecastday);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            setError(axiosError.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      };
  
      fetchWeatherData();
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!forecastWeatherData) {
      return <div>Loading...</div>;
    }
  
    const forecastWeatherChartData = forecastWeatherData.map((day) => ({
      date: day.date,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      avgWindSpeed: day.day.maxwind_kph,
      maxTemperature: day.day.maxtemp_c,
      minTemperature: day.day.maxtemp_c,
    }));

  return (
    <><div>
          <h1>Weather Forecast</h1>

          <ResponsiveContainer width="100%" height={400}>
              <LineChart data={forecastWeatherChartData}>
                  <XAxis dataKey="date" />
                  <YAxis type="number" domain={['dataMin', 'dataMax']} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="maxTemp" stroke="#8884d8" />
                  <Line type="monotone" dataKey="minTemp" stroke="#82ca9d" />
              </LineChart>
          </ResponsiveContainer>

          <h2>Forecast Details</h2>
          <BarChart width={800} height={400} data={forecastWeatherChartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="maxTemp" fill="#8884d8" />
              <Bar dataKey="minTemp" fill="#82ca9d" />
          </BarChart>
      </div>


      <h1>Forecast Weather</h1>
      
      <div className="w-full h-96 bg-white rounded-md">
              <ResponsiveContainer>
                  <BarChart data={forecastWeatherChartData}>
                      <XAxis dataKey="date" />
                      <YAxis type="number" domain={['dataMin', 'dataMax']} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="maxTemperature" fill="#8884d8" />
                      <Bar dataKey="minTemperature" fill="#82ca9d" />
                      <Bar dataKey="avgWindSpeed" fill="#ffc658" />
                  </BarChart>
              </ResponsiveContainer>
      </div>
  ;</>
)};


export default WeatherApp;
function setCurrentWeatherData(current: CurrentWeatherData) {
    throw new Error('Function not implemented.');
}

