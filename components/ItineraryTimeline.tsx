import React from 'react';
import { ItineraryItem, ActivityType } from '../types';
import { MapPin, Train, Utensils, ShoppingBag, BedDouble, Camera, Plane, Navigation, Edit2, Trash2 } from 'lucide-react';

interface Props {
  items: ItineraryItem[];
  onEdit: (item: ItineraryItem) => void;
  onDelete: (id: string) => void;
}

const ItineraryTimeline: React.FC<Props> = ({ items, onEdit, onDelete }) => {
  
  const openMap = (address: string) => {
    const encoded = encodeURIComponent(address);
    window.location.href = `http://maps.apple.com/?daddr=${encoded}&dirflg=d`;
  };

  const getIcon = (type: ActivityType, transport?: string) => {
    if (type === ActivityType.Transport) {
        if (transport === 'Plane') return <Plane size={18} />;
        return <Train size={18} />;
    }
    switch (type) {
      case ActivityType.Food: return <Utensils size={18} />;
      case ActivityType.Shopping: return <ShoppingBag size={18} />;
      case ActivityType.Accommodation: return <BedDouble size={18} />;
      case ActivityType.Sightseeing: return <Camera size={18} />;
      default: return <MapPin size={18} />;
    }
  };

  const getCardStyle = (type: ActivityType) => {
    switch (type) {
      case ActivityType.Food: return 'bg-white';
      case ActivityType.Shopping: return 'bg-white';
      case ActivityType.Sightseeing: return 'bg-ind-orange text-ind-black';
      default: return 'bg-white';
    }
  };

  return (
    <div className="space-y-6 relative ml-2 my-4 pb-20">
        {/* Continuous Line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-ind-black"></div>

      {items.map((item) => (
        <div key={item.id} className="relative pl-12 group">
          {/* Timeline Dot */}
          <div className="absolute left-0 top-0 w-10 h-10 bg-ind-white border-ind shadow-hard-sm flex items-center justify-center z-10">
            {getIcon(item.type, item.transportMethod)}
          </div>

          {/* Content Card */}
          <div className={`p-4 border-ind shadow-hard ${getCardStyle(item.type)} transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none relative`}>
            
            <div className="flex justify-between items-start mb-2 border-b-2 border-ind-black/10 pb-2">
              <span className="text-sm font-black tracking-tight font-mono">
                {item.startTime} {item.endTime && `- ${item.endTime}`}
              </span>
              <div className="flex gap-2">
                  {item.type === ActivityType.Transport && (
                    <span className="text-[10px] font-bold border-2 border-ind-black px-1 uppercase bg-ind-gray h-fit">
                      {item.transportMethod || 'Transport'}
                    </span>
                  )}
                  {/* Action Buttons */}
                  <button onClick={(e) => { e.stopPropagation(); onEdit(item); }} className="text-ind-black hover:text-ind-orange transition-colors">
                      <Edit2 size={14} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} className="text-ind-black hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                  </button>
              </div>
            </div>
            
            <h4 className="text-lg font-black uppercase mb-1 leading-none">{item.title}</h4>
            
            {item.description && (
              <p className="text-xs font-bold opacity-80 mb-2">{item.description}</p>
            )}

            {item.location && (
              <button 
                onClick={() => openMap(item.location!.address)}
                className="mt-2 w-full py-2 bg-ind-black text-white text-xs font-bold uppercase flex items-center justify-center hover:bg-ind-orange hover:text-ind-black transition-colors"
              >
                <Navigation size={12} className="mr-2" />
                Navigate
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;