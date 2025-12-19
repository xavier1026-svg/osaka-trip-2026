import React, { useState, useEffect } from 'react';
import { TRIP_START_DATE } from '../constants';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number}>({ days: 0, hours: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = TRIP_START_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0 });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-ind-orange border-ind shadow-hard p-4 flex flex-col items-center justify-center relative overflow-hidden h-full">
      <div className="absolute top-2 left-2 text-[10px] font-black text-ind-black border-2 border-ind-black px-1">
        T-MINUS
      </div>
      <div className="flex items-baseline space-x-1 mt-2">
        <span className="text-5xl font-black text-ind-black tracking-tighter">{timeLeft.days}</span>
        <span className="text-xs font-bold text-ind-black mb-1">DAYS</span>
      </div>
      <div className="w-full h-1 bg-ind-black my-1"></div>
      <div className="text-[10px] font-bold text-ind-black uppercase">
        2026.01.01 Osaka
      </div>
    </div>
  );
};

export default Countdown;