
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
    <div className="w-full h-96 bg-pink-200"> {/* Pink background */}
      <ResponsiveContainer>
        <LineChart data={weatherData}>
          <XAxis dataKey="startTime" className="text-green-500" /> {/* Green axis */}
          <YAxis className="text-green-500" /> {/* Green axis */}
          <CartesianGrid strokeDasharray="0 0" /> {/* Remove dot lines */}
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="values.temperature" stroke="#4CAF50" dot={false} /> {/* Green line */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export default WeatherForecastChart;

//  data={weatherData}
