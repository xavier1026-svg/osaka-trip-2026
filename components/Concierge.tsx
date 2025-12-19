import React, { useState } from 'react';
import { generateBackupPlan, askTravelAssistant } from '../services/geminiService';
import { Sparkles, Umbrella, Map, Loader2, Send } from 'lucide-react';

const Concierge: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [input, setInput] = useState('');

  const handleBackupPlan = async () => {
    setLoading(true);
    setResponse(null);
    // Mocking current context for the demo
    const result = await generateBackupPlan('Umeda, Osaka', 'Rainy');
    setResponse(result);
    setLoading(false);
  };

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(null);
    const result = await askTravelAssistant(input);
    setResponse(result);
    setLoading(false);
    setInput('');
  };

  return (
    <div className="p-4 space-y-6 pb-24">
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold flex items-center mb-2">
                <Sparkles className="mr-2" /> AI 隨身導遊
            </h2>
            <p className="text-white/90 text-sm">
                不確定要去哪？或是天氣突然變差？隨時問我！
            </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={handleBackupPlan}
                disabled={loading}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
            >
                <Umbrella className="text-blue-500 mb-2" size={28} />
                <span className="font-semibold text-gray-800">雨天備案</span>
                <span className="text-xs text-gray-500 mt-1">室內景點建議</span>
            </button>
            <button 
                 onClick={() => {
                    setInput("推薦大阪難波附近的宵夜");
                    handleAsk();
                 }}
                 disabled={loading}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
            >
                <Map className="text-green-500 mb-2" size={28} />
                <span className="font-semibold text-gray-800">附近推薦</span>
                <span className="text-xs text-gray-500 mt-1">美食與活動</span>
            </button>
        </div>

        {/* Chat Input Area */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">自訂詢問</label>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="例如：我要去哪裡買相機？"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={handleAsk}
                    disabled={loading || !input}
                    className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>

        {/* Output Area */}
        {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Loader2 className="animate-spin mb-2" size={32} />
                <span className="text-sm">AI 正在思考中...</span>
            </div>
        )}

        {response && !loading && (
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 animation-fade-in">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <Sparkles size={16} className="text-violet-500 mr-2" /> 建議結果
                </h3>
                <div className="prose prose-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {response}
                </div>
            </div>
        )}
    </div>
  );
};

export default Concierge;
