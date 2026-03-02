import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Loader2, X, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../constants';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Greetings. I am Sahil's digital intelligence. How can I assist you in exploring his technical journey and AI vision today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulated AI response for portfolio demonstration
    setTimeout(() => {
      let aiResponse = "Processing query... ";
      const query = userMessage.toLowerCase();

      if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
        aiResponse = "I have architected several intelligent systems, including the SkillSpectrum AI platform, an AI-Driven Portfolio, and the Voice-to-Voice Translator. My focus is always on high-fidelity, resilient architectures.";
      } else if (query.includes('skill') || query.includes('tech') || query.includes('stack')) {
        aiResponse = "My foundational expertise lies in Algorithms, Data Structures, and System Design. I leverage Java, Python, and SQL, alongside modern AI frameworks to build autonomous intelligence.";
      } else if (query.includes('experience') || query.includes('internship') || query.includes('job')) {
        aiResponse = "During my time at Celebal Technologies, I architected enterprise-grade SQL data pipelines for Gen AI. I've also contributed to microservices at RD INFRO TECHNOLOGY in Hyderabad.";
      } else if (query.includes('contact') || query.includes('email') || query.includes('hire')) {
        aiResponse = `You can initialize a connection with me at ${RESUME_DATA.email} or reach out via LinkedIn. I'm always open to discussing architectures and AI innovations.`;
      } else if (query.includes('education') || query.includes('study') || query.includes('cgpa')) {
        aiResponse = `I place a high value on foundational computer science principles. My academic standing reflects this rigor with a ${RESUME_DATA.about.cgpa}.`;
      } else {
        aiResponse = "Fascinating query. I am currently optimized to discuss my engineering methodologies, projects, and technical vision. Could you specify which module of my expertise you'd like to explore?";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-5 bg-neon-blue text-dark-base rounded-full shadow-[0_0_20px_#00f0ff66] cursor-pointer group"
      >
        <Sparkles size={24} className="group-hover:animate-spin-slow" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(10px)' }}
            className="fixed bottom-28 right-8 z-50 w-[90vw] md:w-[400px] h-[600px] glass rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl border-neon-blue/20"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-neon-blue/10 flex items-center justify-center text-neon-blue shadow-[0_0_10px_#00f0ff33]">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Sahil's Intelligence</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                    <p className="text-[10px] font-bold text-neon-green uppercase tracking-widest">Neural Link Active</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-neon-blue text-dark-base font-medium rounded-tr-none'
                    : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                    }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-3xl rounded-tl-none border border-white/10">
                    <Loader2 size={20} className="animate-spin text-neon-blue" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Initiate query..."
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-neon-blue transition-all placeholder:text-slate-600"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-neon-blue hover:text-white disabled:text-slate-700 transition-colors cursor-pointer"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
