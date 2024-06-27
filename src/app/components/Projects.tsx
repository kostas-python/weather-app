{/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apikey = '2xPYMPgFbcLS5Y2QLr9VOSav8TZbtN5N';
  const location = 'new york';
  const units = 'metric';
  const timesteps = '1d';

  useEffect(() => {
    const fetchWeather = async () => {
      const params = {
        apikey,
        location,
        units,
        timesteps,
      };
      const options = { headers: { accept: 'application/json' } };
      try {
        const response = await axios.get('https://api.tomorrow.io/v4/weather/forecast', { params, ...options });
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching weather data');
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const convertRawDataIntoTempPlots = (rawData: any[]) => {
    const maxTemperatures: any[] = [];
    const minTemperatures: any[] = [];
    const avgTemperatures: any[] = [];
    const timeStamps: any[] = [];
    
    rawData.forEach((d: { time: any; values: { temperatureMax: any; temperatureMin: any; temperatureAvg: any; }; }) => {
      timeStamps.push(d.time);
      maxTemperatures.push(d.values.temperatureMax);
      minTemperatures.push(d.values.temperatureMin);
      avgTemperatures.push(d.values.temperatureAvg);
    });

    return {
      timeStamps,
      maxTemperatures,
      minTemperatures,
      avgTemperatures,
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const temperaturePlots = weather ? convertRawDataIntoTempPlots(weather.timelines.daily) : null;

  return (
    <div>
      <h1>Projects</h1>
      {temperaturePlots && (
        <div>
          <h2>Temperature Trends in New York Over the Next 5 Days</h2>
          <div>
            <strong>Dates: </strong>
            {temperaturePlots.timeStamps.join(', ')}
          </div>
          <div>
            <strong>Max Temperatures: </strong>
            {temperaturePlots.maxTemperatures.join(', ')}
          </div>
          <div>
            <strong>Min Temperatures: </strong>
            {temperaturePlots.minTemperatures.join(', ')}
          </div>
          <div>
            <strong>Avg Temperatures: </strong>
            {temperaturePlots.avgTemperatures.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects; */}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherChart from './components/WeatherChart';

const Projects: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apikey = '2xPYMPgFbcLS5Y2QLr9VOSav8TZbtN5N';
  const location = 'new york';
  const units = 'metric';
  const timesteps = '1d';

  useEffect(() => {
    const fetchWeather = async () => {
      const params = {
        apikey,
        location,
        units,
        timesteps,
      };
      const options = { headers: { accept: 'application/json' } };
      try {
        const response = await axios.get('https://api.tomorrow.io/v4/weather/forecast', { params, ...options });
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching weather data');
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const convertRawDataIntoTempPlots = (rawData: any[]) => {
    const maxTemperatures: number[] = [];
    const minTemperatures: number[] = [];
    const avgTemperatures: number[] = [];
    const timeStamps: string[] = [];
    
    rawData.forEach((d) => {
      timeStamps.push(d.time);
      maxTemperatures.push(d.values.temperatureMax);
      minTemperatures.push(d.values.temperatureMin);
      avgTemperatures.push(d.values.temperatureAvg);
    });

    return {
      timeStamps,
      maxTemperatures,
      minTemperatures,
      avgTemperatures,
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const temperaturePlots = weather ? convertRawDataIntoTempPlots(weather.timelines.daily) : null;

  return (
    <div>
      <h1>Projects</h1>
      {temperaturePlots && <WeatherChart data={temperaturePlots} />}
    </div>
  );
};

export default Projects;
