

import React, { useEffect, FC } from 'react';


interface WeatherWidgetProps {
  temperatureUnit?: 'C' | 'F';
}


const WeatherWidget: FC<WeatherWidgetProps> = ({ temperatureUnit = 'C' }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';

    // Change the temperature unit based on the temperatureUnit prop
    script.src = `https://www.weatherapi.com/weather/widget.ashx?loc=2801268&wid=4&tu=2${temperatureUnit === 'C' ? 2 : 1}&div=weatherapi-weather-widget-4`;


    // Append the script to the document head

    script.async = true;
    document.head.appendChild(script); 

    // Clean up by removing the script from the document head
    
    return () => {
      document.head.removeChild(script); 
    };
  }, [temperatureUnit]);



  return (
    <div>
      <div id="weatherapi-weather-widget-4" className="w-2/4"></div>
      <noscript>
        <a href="https://www.weatherapi.com/weather/q/london-2801268">
          10 day hour by hour London weather
        </a>
      </noscript>
    </div>
  );
};


export default WeatherWidget;
