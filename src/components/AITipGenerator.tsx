import React, { useState } from 'react';
import { Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { getStagingTip } from '../services/geminiService';

const AITipGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setTip(null);
    
    // Simulate a slight delay for better UX if API is too fast
    const result = await getStagingTip(input);
    setTip(result);
    setLoading(false);
  };

  return (
    <section id="ai-tips" className="py-24 bg-stone-900 text-stone-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-moss-900/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-terracotta-900/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-stone-800/50 px-4 py-1.5 rounded-full border border-stone-700 mb-6">
          <Sparkles className="w-4 h-4 text-terracotta-500" />
          <span className="text-xs font-medium uppercase tracking-wider text-stone-300">Smart Consulting</span>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
          Need a quick tip?
        </h2>
        <p className="text-stone-400 text-lg mb-10 max-w-2xl mx-auto">
          Our AI is trained to give practical and accessible advice. Describe a room or a problem (e.g., "dark living room", "small kitchen") and get an immediate suggestion.
        </p>

        <form onSubmit={handleGenerate} className="max-w-lg mx-auto mb-10">
          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Master bedroom with too much furniture..."
              className="w-full bg-stone-800/80 border border-stone-700 text-white placeholder-stone-500 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-moss-500 focus:border-transparent transition-all shadow-lg"
            />
            <button
              type="submit"
              disabled={loading || !input}
              className="absolute right-2 top-2 h-10 w-10 bg-moss-600 rounded-full flex items-center justify-center text-white hover:bg-moss-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            </button>
          </div>
        </form>

        {tip && (
          <div className="bg-stone-800/50 border border-stone-700 rounded-2xl p-8 max-w-2xl mx-auto text-left animate-fade-in-up">
            <div className="flex items-start gap-4">
              <div className="bg-terracotta-500/20 p-2 rounded-lg">
                <Lightbulb className="w-6 h-6 text-terracotta-500" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg mb-2 text-stone-200">Our Suggestion</h4>
                <p className="text-stone-300 leading-relaxed">
                  {tip}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AITipGenerator;