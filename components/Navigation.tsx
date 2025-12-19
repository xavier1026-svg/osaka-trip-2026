import React from 'react';
import { Tab } from '../types';
import { Home, Calendar, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  const getTabClass = (tab: Tab) => {
    const base = "flex flex-col items-center justify-center w-full h-full space-y-1";
    return currentTab === tab ? `${base} text-ios-blue` : `${base} text-ios-gray`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[83px] bg-white/90 backdrop-blur-md border-t border-ios-separator pb-5 z-50">
      <div className="flex justify-around h-full">
        <button className={getTabClass('home')} onClick={() => onTabChange('home')}>
          <Home size={24} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">首頁</span>
        </button>
        <button className={getTabClass('schedule')} onClick={() => onTabChange('schedule')}>
          <Calendar size={24} strokeWidth={currentTab === 'schedule' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">行程表</span>
        </button>
        <button className={getTabClass('concierge')} onClick={() => onTabChange('concierge')}>
          <Sparkles size={24} strokeWidth={currentTab === 'concierge' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">AI 嚮導</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
