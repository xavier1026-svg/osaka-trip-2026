import React, { useState } from 'react';
import Countdown from './components/Countdown';
import WeatherCard from './components/WeatherCard';
import ItineraryTimeline from './components/ItineraryTimeline';
import Concierge from './components/Concierge';
import { ViewState, ExpenseItem, ChecklistItem, DaySchedule, ItineraryItem, ActivityType } from './types';
import { ITINERARY, INITIAL_EXPENSES, INITIAL_CHECKLIST } from './constants';
import { ArrowLeft, Calculator, CheckSquare, Plus, Trash2, JapaneseYen, Map, User, Home as HomeIcon, X, Save } from 'lucide-react';

// Industrial Input Component
const IndInput = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
    <div className="mb-3">
        <label className="block text-xs font-black uppercase mb-1">{label}</label>
        <input 
            type={type} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            className="w-full bg-white border-2 border-ind-black p-2 font-bold focus:outline-none focus:shadow-hard transition-shadow"
        />
    </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedDate, setSelectedDate] = useState<string>(ITINERARY[0].date);
  
  // -- Data State --
  const [schedule, setSchedule] = useState<DaySchedule[]>(ITINERARY);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  
  // -- Calculator State --
  const [calcInput, setCalcInput] = useState<string>('');

  // -- Edit Modal State --
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<ItineraryItem>>({});
  const [editDayDate, setEditDayDate] = useState<string>('');

  // -- Helper Functions --
  const currentSchedule = schedule.find(d => d.date === selectedDate) || schedule[0];
  const totalSpentTWD = expenses.reduce((acc, curr) => acc + curr.amountTWD, 0);

  // -- Itinerary Actions --
  const handleEditEvent = (item: ItineraryItem) => {
    setEditingItem(item);
    setEditDayDate(selectedDate);
    setIsModalOpen(true);
  };

  const handleCreateEvent = () => {
    setEditingItem({
        id: '',
        type: ActivityType.Sightseeing,
        startTime: '10:00',
        endTime: '11:00',
        title: '',
        description: '',
        location: { name: '', address: '' }
    });
    setEditDayDate(selectedDate);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (itemId: string) => {
      if(!confirm("確定要刪除這個行程嗎？")) return;
      
      const newSchedule = schedule.map(day => {
          if (day.date === selectedDate) {
              return { ...day, items: day.items.filter(i => i.id !== itemId) };
          }
          return day;
      });
      setSchedule(newSchedule);
  };

  const handleSaveEvent = () => {
      if (!editingItem.title || !editDayDate) return;

      const newItem: ItineraryItem = {
          id: editingItem.id || Date.now().toString(),
          startTime: editingItem.startTime || '00:00',
          endTime: editingItem.endTime,
          title: editingItem.title,
          type: editingItem.type as ActivityType,
          description: editingItem.description || '',
          transportMethod: editingItem.transportMethod,
          location: {
              name: editingItem.location?.name || '',
              address: editingItem.location?.address || editingItem.location?.name || ''
          }
      };

      const newSchedule = schedule.map(day => {
          if (day.date === editDayDate) {
              const existingIndex = day.items.findIndex(i => i.id === newItem.id);
              let newItems = [...day.items];
              
              if (existingIndex >= 0) {
                  newItems[existingIndex] = newItem;
              } else {
                  newItems.push(newItem);
              }
              // Sort by time
              newItems.sort((a, b) => a.startTime.localeCompare(b.startTime));
              return { ...day, items: newItems };
          }
          return day;
      });

      setSchedule(newSchedule);
      setIsModalOpen(false);
  };

  // -- Calculator Actions --
  const handleAddExpense = () => {
    if (!calcInput) return;
    const jpy = parseInt(calcInput);
    const twd = Math.round(jpy * 0.22); // Mock rate
    const newItem: ExpenseItem = {
        id: Date.now().toString(),
        title: '快速記帳',
        category: 'Shopping',
        amountJPY: jpy,
        amountTWD: twd,
        date: new Date().toISOString().split('T')[0]
    };
    setExpenses([newItem, ...expenses]);
    setCalcInput('');
  };

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  // -- Modal Render --
  const renderEditModal = () => (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ind-black/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm border-2 border-ind-black shadow-hard p-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 border-b-2 border-ind-black pb-2">
                  <h3 className="text-xl font-black uppercase">
                      {editingItem.id ? 'EDIT EVENT' : 'NEW EVENT'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)}>
                      <X size={24} />
                  </button>
              </div>

              <IndInput 
                label="TITLE" 
                value={editingItem.title} 
                onChange={(e: any) => setEditingItem({...editingItem, title: e.target.value})} 
                placeholder="行程名稱"
              />

              <div className="grid grid-cols-2 gap-2">
                <IndInput 
                    label="START TIME" 
                    type="time"
                    value={editingItem.startTime} 
                    onChange={(e: any) => setEditingItem({...editingItem, startTime: e.target.value})} 
                />
                 <IndInput 
                    label="END TIME" 
                    type="time"
                    value={editingItem.endTime} 
                    onChange={(e: any) => setEditingItem({...editingItem, endTime: e.target.value})} 
                />
              </div>

              <div className="mb-3">
                  <label className="block text-xs font-black uppercase mb-1">TYPE</label>
                  <select 
                    className="w-full bg-white border-2 border-ind-black p-2 font-bold focus:outline-none focus:shadow-hard"
                    value={editingItem.type}
                    onChange={(e) => setEditingItem({...editingItem, type: e.target.value as ActivityType})}
                  >
                      {Object.values(ActivityType).map(t => (
                          <option key={t} value={t}>{t}</option>
                      ))}
                  </select>
              </div>
              
              <IndInput 
                label="LOCATION / ADDRESS" 
                value={editingItem.location?.name} 
                onChange={(e: any) => setEditingItem({...editingItem, location: {name: e.target.value, address: e.target.value}})} 
                placeholder="地點"
              />

              <div className="mb-3">
                  <label className="block text-xs font-black uppercase mb-1">NOTE</label>
                  <textarea 
                    className="w-full bg-white border-2 border-ind-black p-2 font-bold focus:outline-none focus:shadow-hard h-20"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    placeholder="備註..."
                  />
              </div>

              <button 
                onClick={handleSaveEvent}
                className="w-full bg-ind-orange text-ind-black border-2 border-ind-black py-3 font-black shadow-hard active:translate-y-1 active:shadow-none transition-all flex justify-center items-center gap-2"
              >
                  <Save size={18} /> SAVE EVENT
              </button>
          </div>
      </div>
  );

  // -- Views --

  const renderHome = () => (
    <div className="p-4 grid grid-cols-2 gap-4 h-full content-start pb-24">
       {/* Header */}
       <div className="col-span-2 flex justify-between items-end mb-2 border-b-4 border-ind-black pb-2">
            <h1 className="text-4xl font-black italic tracking-tighter">OSAKA<span className="text-ind-orange">.</span></h1>
            <span className="font-mono font-bold text-sm bg-ind-black text-white px-2">2026</span>
       </div>

       {/* Grid 1: Itinerary (Wide) */}
       <div 
         onClick={() => setView('schedule')}
         className="col-span-2 bg-white border-ind shadow-hard p-4 active:translate-y-1 active:shadow-none transition-all cursor-pointer relative group"
       >
         <div className="absolute top-0 right-0 bg-ind-black text-white px-2 py-1 text-xs font-bold">NEXT UP</div>
         <h2 className="text-2xl font-black mb-1">SCHEDULE</h2>
         <p className="font-mono text-sm text-gray-500 mb-4">{ITINERARY[0].items[0].title}</p>
         <div className="flex justify-end">
            <ArrowLeft className="rotate-180" />
         </div>
       </div>

       {/* Grid 2: Calculator */}
       <div 
         onClick={() => setView('money')}
         className="bg-white border-ind shadow-hard p-4 flex flex-col justify-between aspect-square active:translate-y-1 active:shadow-none transition-all cursor-pointer"
       >
         <Calculator size={32} className="text-ind-orange" />
         <div>
            <div className="text-xs font-bold text-gray-400">SPENT (TWD)</div>
            <div className="text-xl font-black">${totalSpentTWD.toLocaleString()}</div>
         </div>
       </div>

       {/* Grid 3: Bag */}
       <div 
         onClick={() => setView('bag')}
         className="bg-ind-black text-white border-ind shadow-hard p-4 flex flex-col justify-between aspect-square active:translate-y-1 active:shadow-none transition-all cursor-pointer"
       >
         <CheckSquare size={32} />
         <div>
            <div className="text-xs font-bold text-gray-400">CHECKLIST</div>
            <div className="text-xl font-black">{checklist.filter(i => i.checked).length}/{checklist.length}</div>
         </div>
       </div>

        {/* Grid 4: Concierge */}
       <div 
         onClick={() => setView('concierge')}
         className="col-span-1 bg-white border-ind shadow-hard p-4 flex flex-col justify-center items-center aspect-square active:translate-y-1 active:shadow-none transition-all cursor-pointer"
       >
          <div className="text-4xl">🤖</div>
          <div className="text-sm font-black mt-2">AI GUIDE</div>
       </div>

       {/* Grid 5: Countdown */}
       <div className="col-span-1 aspect-square">
          <Countdown />
       </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="pb-24">
        {/* Date Tabs */}
        <div className="flex overflow-x-auto no-scrollbar border-b-2 border-ind-black bg-white sticky top-0 z-20">
            {schedule.map((day) => {
                const isSelected = selectedDate === day.date;
                const d = new Date(day.date);
                return (
                    <button
                        key={day.date}
                        onClick={() => setSelectedDate(day.date)}
                        className={`flex-shrink-0 px-6 py-4 border-r-2 border-ind-black flex flex-col items-center ${isSelected ? 'bg-ind-orange' : 'bg-white'}`}
                    >
                        <span className="text-[10px] font-black uppercase tracking-wider">{d.toLocaleDateString('en-US', {weekday: 'short'})}</span>
                        <span className="text-2xl font-black leading-none">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>

        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-black italic uppercase">{currentSchedule.dayLabel}</h2>
                <button 
                    onClick={handleCreateEvent}
                    className="bg-ind-black text-white p-2 border-2 border-ind-black shadow-hard-sm active:translate-y-1 active:shadow-none"
                >
                    <Plus size={20} />
                </button>
            </div>
            
            <WeatherCard {...currentSchedule.weatherForecast} />
            <ItineraryTimeline 
                items={currentSchedule.items} 
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
            />
        </div>
    </div>
  );

  const renderMoney = () => (
    <div className="p-4 flex flex-col h-full pb-24">
        {/* Display */}
        <div className="bg-ind-black p-6 border-ind shadow-hard mb-6 text-right">
            <div className="text-gray-400 font-mono text-sm mb-1">JPY INPUT</div>
            <div className="text-white text-4xl font-mono font-bold truncate">¥ {calcInput || '0'}</div>
            <div className="w-full h-px bg-gray-700 my-2"></div>
            <div className="text-ind-orange text-xl font-mono font-bold">≈ NT$ {Math.round((parseInt(calcInput || '0') * 0.22)).toLocaleString()}</div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
            {[7,8,9,4,5,6,1,2,3].map(num => (
                <button 
                    key={num}
                    onClick={() => setCalcInput(prev => prev + num)}
                    className="h-16 bg-white border-ind shadow-hard font-black text-2xl active:translate-y-1 active:shadow-none btn-press"
                >
                    {num}
                </button>
            ))}
            <button 
                onClick={() => setCalcInput('')}
                className="h-16 bg-ind-gray border-ind shadow-hard font-bold text-lg text-red-600 active:translate-y-1 active:shadow-none btn-press"
            >C</button>
            <button 
                onClick={() => setCalcInput(prev => prev + '0')}
                className="h-16 bg-white border-ind shadow-hard font-black text-2xl active:translate-y-1 active:shadow-none btn-press"
            >0</button>
            <button 
                onClick={handleAddExpense}
                className="h-16 bg-ind-orange border-ind shadow-hard font-bold text-lg active:translate-y-1 active:shadow-none btn-press flex items-center justify-center"
            >
                ADD
            </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-auto">
            <h3 className="font-black border-b-2 border-ind-black mb-2">HISTORY</h3>
            {expenses.map(e => (
                <div key={e.id} className="flex justify-between items-center py-2 border-b border-gray-300">
                    <div>
                        <div className="font-bold text-sm">{e.title}</div>
                        <div className="text-xs text-gray-500">{e.date}</div>
                    </div>
                    <div className="text-right">
                        <div className="font-mono font-bold">¥{e.amountJPY}</div>
                        <div className="font-mono text-xs text-gray-500">NT${e.amountTWD}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderBag = () => (
    <div className="p-4 pb-24">
        <h2 className="text-3xl font-black mb-6">CHECKLIST</h2>
        
        {['Luggage', 'Gift'].map(cat => (
            <div key={cat} className="mb-8">
                <h3 className="text-xl font-black bg-ind-black text-white px-2 py-1 inline-block mb-3 uppercase">{cat}</h3>
                <div className="space-y-3">
                    {checklist.filter(i => i.category === cat).map(item => (
                        <div 
                            key={item.id} 
                            onClick={() => toggleCheck(item.id)}
                            className={`flex items-center p-3 border-ind shadow-hard transition-all cursor-pointer ${item.checked ? 'bg-ind-gray opacity-60' : 'bg-white'}`}
                        >
                            <div className={`w-6 h-6 border-2 border-ind-black mr-3 flex items-center justify-center ${item.checked ? 'bg-ind-orange' : 'white'}`}>
                                {item.checked && <CheckSquare size={16} />}
                            </div>
                            <span className={`font-bold ${item.checked ? 'line-through' : ''}`}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#E5E5E5] text-ind-black font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative border-x-2 border-ind-black">
      
      {/* Edit Modal */}
      {isModalOpen && renderEditModal()}

      {/* View Content */}
      <div className="h-full overflow-y-auto no-scrollbar pt-2">
        {view === 'home' && renderHome()}
        {view === 'schedule' && renderSchedule()}
        {view === 'money' && renderMoney()}
        {view === 'bag' && renderBag()}
        {view === 'concierge' && <Concierge />}
      </div>

      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 z-50 pointer-events-none">
        <div className="flex items-end justify-between pointer-events-auto">
             {view !== 'home' ? (
                <button 
                    onClick={() => setView('home')}
                    className="w-12 h-12 bg-white border-ind shadow-hard rounded-full flex items-center justify-center active:translate-y-1 active:shadow-none transition-all"
                >
                    <ArrowLeft size={24} />
                </button>
             ) : <div className="w-12"></div>}
             
             {/* Unified Action Button */}
             <button 
                className="w-48 h-14 bg-ind-black text-white border-ind shadow-hard flex items-center justify-center space-x-2 active:translate-y-1 active:shadow-none transition-all"
                onClick={() => {
                    if (view === 'schedule') {
                        handleCreateEvent();
                    } else {
                        setView('money');
                    }
                }} 
             >
                {view === 'schedule' ? (
                     <><Plus size={20} className="text-ind-orange" /><span className="font-black tracking-widest">ADD EVENT</span></>
                ) : (
                     <><Plus size={20} className="text-ind-orange" /><span className="font-black tracking-widest">RECORD</span></>
                )}
               
             </button>

             <div className="w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default App;