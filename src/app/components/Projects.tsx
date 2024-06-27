
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeatherData {
  startTime: string;
  values: {
    temperature: number;
  };
}

const WeatherForecastChart: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<{
          data: {
            timelines: {
              intervals: WeatherData[];
            }[];
          };
        }>('https://api.tomorrow.io/v4/timelines', {
          params: {
            location: '40.730610,-73.935242',
            fields: ['temperature'],
            units: 'metric',
            timesteps: ['1h'],
            apikey: '2xPYMPgFbcLS5Y2QLr9VOSav8TZbtN5N',
          },
        });

        setWeatherData(response.data.data.timelines[0].intervals);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={weatherData}>
          <XAxis dataKey="startTime" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="values.temperature" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherForecastChart;

//  data={weatherData}
