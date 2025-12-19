import React from 'react';
import { CloudRain, Sun, Cloud, Snowflake, Wind } from 'lucide-react';

interface WeatherCardProps {
  tempHigh: number;
  tempLow: number;
  condition: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow';
  advisory: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ tempHigh, tempLow, condition, advisory }) => {
  const getIcon = () => {
    switch (condition) {
      case 'Sunny': return <Sun className="text-ind-orange" size={36} strokeWidth={2.5} />;
      case 'Cloudy': return <Cloud className="text-ind-black" size={36} strokeWidth={2.5} />;
      case 'Rain': return <CloudRain className="text-blue-600" size={36} strokeWidth={2.5} />;
      case 'Snow': return <Snowflake className="text-cyan-600" size={36} strokeWidth={2.5} />;
      default: return <Sun className="text-ind-orange" size={36} strokeWidth={2.5} />;
    }
  };

  return (
    <div className="bg-white p-4 border-ind shadow-hard flex items-stretch justify-between mb-6">
      <div className="flex flex-col justify-between">
        <span className="text-xs font-bold uppercase tracking-wider bg-ind-black text-white px-2 py-0.5 self-start">
          WEATHER
        </span>
        <div className="flex items-center space-x-3 mt-2">
          {getIcon()}
          <div>
            <div className="text-3xl font-black text-ind-black leading-none">{tempHigh}°</div>
            <div className="text-xs font-bold text-gray-500 mt-1">{tempLow}° / {condition}</div>
          </div>
        </div>
      </div>
      
      <div className="w-px bg-ind-black mx-2"></div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-xs font-bold text-ind-orange mb-1 flex items-center">
          <Wind size={12} className="mr-1" /> ADVISORY
        </div>
        <div className="text-sm font-bold text-ind-black leading-tight">
          {advisory}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;