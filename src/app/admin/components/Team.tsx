import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Team: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = '2xPYMPgFbcLS5Y2QLr9VOSav8TZbtN5N';
  const LATITUDE = '40.7128'; // Example latitude (New York City)
  const LONGITUDE = '-74.0060'; // Example longitude (New York City)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.tomorrow.io/v4/timelines`, {
          params: {
            apikey: API_KEY,
            location: `${LATITUDE},${LONGITUDE}`,
            fields: ['temperature', 'weatherCode'],
            timesteps: 'current',
            units: 'metric',
          },
        });
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [API_KEY, LATITUDE, LONGITUDE]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Current Weather</h1>
      {weather && (
        <div>
          <p>Temperature: {weather.data.timelines[0].intervals[0].values.temperature}°C</p>
          <p>Weather Code: {weather.data.timelines[0].intervals[0].values.weatherCode}</p>
        </div>
      )}
      
    </div>
  );
};

export default Team;
