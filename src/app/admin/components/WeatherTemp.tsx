
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { format } from 'date-fns';




interface WeatherData {
  startTime: string;
  values: {
    temperature: number;
  };
}



const WeatherTemp: React.FC = () => {
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
            location: 'london',
            fields: ['temperature'],
            units: 'metric',
            timesteps: ['1d'],
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

 // chart //

 return (
  <div className="max-w-4xl max-h-full w-full border-4 border-teal-800  rounded-lg shadow dark:bg-gray-800 p-4 mt-20 md:p-6" style={{ backgroundColor: '#f0f0f0' }}>
    <div className="flex justify-center ">
      <div className="text-center">
        <h5 className="leading-none text-3xl font-bold text-teal-500 pb-2" >Weather Forecast</h5>
        <p className="text-base font-normal text-gray-9500 dark:text-gray-400">London temperature for the next 5 days</p>
      </div>
    </div>
    <div id="weather-chart">
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={weatherData} className="leading-10 ">
          <XAxis dataKey="startTime" tickFormatter={(value) => format(new Date(value), 'MMM dd')}/>
          <YAxis domain={[15, 28]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area
              type="monotone"
              dataKey="values.temperature"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.2}
            />
          <Line type="monotone" dataKey="values.temperature" stroke="#00cc99" strokeWidth={4}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
};

export default WeatherTemp;
//  data={weatherData}
