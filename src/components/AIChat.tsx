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

    setTimeout(() => {
      const q = userMessage.toLowerCase();
      let aiResponse = '';

      // Projects
      if (q.includes('project') || q.includes('build') || q.includes('made') || q.includes('portfolio')) {
        aiResponse = `I've engineered ${RESUME_DATA.projects.length} flagship systems:\n\n` +
          RESUME_DATA.projects.map(p => `• ${p.title} — ${p.solution}`).join('\n\n') +
          `\n\nEach project is grounded in my philosophy: resilient architecture and intelligent design.`;

        // SkillSpectrum
      } else if (q.includes('skillspectrum') || q.includes('interview') || q.includes('voice platform')) {
        const p = RESUME_DATA.projects[0];
        aiResponse = `${p.title}: ${p.solution} Impact: ${p.impact}`;

        // Voice translator
      } else if (q.includes('voice') || q.includes('translator') || q.includes('whisper') || q.includes('gtts')) {
        const p = RESUME_DATA.projects[2];
        aiResponse = `${p.title}: ${p.solution} Impact: ${p.impact} GitHub: ${p.link}`;

        // ClusterView
      } else if (q.includes('cluster') || q.includes('topic model') || q.includes('lda') || q.includes('tsne')) {
        const p = RESUME_DATA.projects[3];
        aiResponse = `${p.title}: ${p.solution} Impact: ${p.impact} GitHub: ${p.link}`;

        // AI Portfolio
      } else if (q.includes('ai portfolio') || q.includes('digital twin') || q.includes('rag')) {
        const p = RESUME_DATA.projects[1];
        aiResponse = `${p.title}: ${p.solution} Impact: ${p.impact} GitHub: ${p.link}`;

        // Experience / Internships
      } else if (q.includes('experience') || q.includes('internship') || q.includes('work') || q.includes('job') || q.includes('company')) {
        aiResponse = `I've completed ${RESUME_DATA.experience.length} high-impact internships:\n\n` +
          RESUME_DATA.experience.map(e => `• ${e.role} @ ${e.company} (${e.period}, ${e.location}): ${e.description[0]}`).join('\n\n');

        // Celebal
      } else if (q.includes('celebal') || q.includes('gen ai') || q.includes('sql pipeline')) {
        const e = RESUME_DATA.experience[0];
        aiResponse = `At ${e.company} (${e.period}): ${e.description.join(' ')}`;

        // RD Infro
      } else if (q.includes('rd infro') || q.includes('java') || q.includes('microservice')) {
        const e = RESUME_DATA.experience[1];
        aiResponse = `At ${e.company} (${e.period}, ${e.location}): ${e.description.join(' ')}`;

        // PHN Technology
      } else if (q.includes('phn') || q.includes('python intern')) {
        const e = RESUME_DATA.experience[2];
        aiResponse = `At ${e.company} (${e.period}): ${e.description.join(' ')}`;

        // Vision / Philosophy / Foundational Principles
      } else if (q.includes('vision') || q.includes('philosophy') || q.includes('principle') || q.includes('belief') || q.includes('approach') || q.includes('ethos')) {
        aiResponse = `My engineering ethos — "${RESUME_DATA.vision.title}" — rests on four pillars:\n\n` +
          RESUME_DATA.vision.content.map(v => `• ${v.topic}: ${v.description}`).join('\n\n');

        // Research & Publications
      } else if (q.includes('research') || q.includes('paper') || q.includes('publication') || q.includes('ijcrt') || q.includes('journal')) {
        aiResponse = `My academic contributions:\n\n` +
          RESUME_DATA.research.map(r => `• ${r.title} — ${r.publication} (${r.period})\n  ${r.description}${r.link ? '\n  Link: ' + r.link : ''}`).join('\n\n');

        // Copyright / Centralize E-Study
      } else if (q.includes('copyright') || q.includes('centralize') || q.includes('e-study') || q.includes('government')) {
        const r = RESUME_DATA.research[1];
        aiResponse = `${r.title} — ${r.publication} (${r.period}): ${r.description} View: ${r.link}`;

        // Certifications / Expertise
      } else if (q.includes('certif') || q.includes('award') || q.includes('badge') || q.includes('expertise') || q.includes('validate') || q.includes('deloitte') || q.includes('aws') || q.includes('bcg') || q.includes('accenture') || q.includes('infosys')) {
        aiResponse = `I hold ${RESUME_DATA.certifications.length} professional certifications:\n\n` +
          RESUME_DATA.certifications.map(c => `• ${c.name} — ${c.skills.join(', ')}`).join('\n');

        // Skills / Tech Stack / Arsenal
      } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('arsenal') || q.includes('tool') || q.includes('language') || q.includes('framework')) {
        aiResponse = `My technical arsenal spans multiple domains:\n\n` +
          `• Fundamentals: ${RESUME_DATA.skills.fundamentals.map(s => s.name).join(', ')}\n` +
          `• Programming: ${RESUME_DATA.skills.programming.map(s => s.name).join(', ')}\n` +
          `• AI / ML: ${RESUME_DATA.skills.ai_ml.map(s => s.name).join(', ')}\n` +
          `• Data Viz: ${RESUME_DATA.skills.data_visualization.map(s => s.name).join(', ')}\n` +
          `• Web & DB: ${[...RESUME_DATA.skills.web, ...RESUME_DATA.skills.database].map(s => s.name).join(', ')}\n` +
          `• Deployment: ${RESUME_DATA.skills.deployment.map(s => s.name).join(', ')}\n` +
          `• Premium AI Tools: ${RESUME_DATA.skills.premium_tools.map(s => s.name).join(', ')}`;

        // Journey / Timeline / Growth
      } else if (q.includes('journey') || q.includes('timeline') || q.includes('growth') || q.includes('evolution') || q.includes('milestone')) {
        aiResponse = `My professional evolution unfolds across ${RESUME_DATA.journey.length} key milestones:\n\n` +
          RESUME_DATA.journey.map((j, i) => `${i + 1}. ${j.title}: ${j.description}`).join('\n\n');

        // Education / Academic / CGPA
      } else if (q.includes('education') || q.includes('study') || q.includes('college') || q.includes('university') || q.includes('degree') || q.includes('cgpa') || q.includes('academic')) {
        aiResponse = `My academic foundation is in Computer Engineering with a ${RESUME_DATA.about.cgpa}. Core competencies: ${RESUME_DATA.about.keySkills}. ${RESUME_DATA.about.intro.substring(0, 200)}...`;

        // Contact / Hire / Reach
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('connect') || q.includes('linkedin') || q.includes('github')) {
        aiResponse = `Establishing connection:\n\n• Email: ${RESUME_DATA.email}\n• Phone: ${RESUME_DATA.phone}\n• LinkedIn: https://${RESUME_DATA.linkedin}\n• GitHub: https://${RESUME_DATA.github}\n• Instagram: https://${RESUME_DATA.instagram}\n• Location: ${RESUME_DATA.location}\n\nI'm always open to discussing AI, engineering, and impactful collaborations.`;

        // Location
      } else if (q.includes('location') || q.includes('where') || q.includes('city') || q.includes('india') || q.includes('pune')) {
        aiResponse = `I am currently based in ${RESUME_DATA.location}, ready to collaborate globally on impactful engineering challenges.`;

        // About / Summary / Who
      } else if (q.includes('about') || q.includes('who') || q.includes('introduce') || q.includes('tell me') || q.includes('sahil') || q.includes('yourself')) {
        aiResponse = `I am ${RESUME_DATA.name} — ${RESUME_DATA.role}.\n\n${RESUME_DATA.about.intro}`;

        // Hobbies / Interests
      } else if (q.includes('hobby') || q.includes('interest') || q.includes('personal') || q.includes('manga') || q.includes('sketch') || q.includes('outside')) {
        aiResponse = `Beyond the terminal, I engage with:\n\n` +
          RESUME_DATA.about.hobbies.map(h => `• ${h.name}: ${h.description}`).join('\n\n');

        // Hello / Hi / Hey
      } else if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greet') || q.match(/^(hi|hey|hello|sup|yo)[\s!?.]*$/)) {
        aiResponse = `Hello! I am Sahil's digital intelligence. I can discuss his projects, internships, skills, research, certifications, vision, and more. What would you like to explore?`;

        // Help
      } else if (q.includes('help') || q.includes('what can') || q.includes('topics') || q.includes('tell me about')) {
        aiResponse = `I can discuss the following about Sahil:\n\n• 🚀 Projects & Innovations\n• 💼 Internship Experience\n• 🧠 Engineering Vision & Philosophy\n• 📚 Research & Publications\n• 🏆 Certifications & Expertise\n• 🛠️ Technical Skills & Arsenal\n• 🎯 Professional Journey\n• 📍 Contact & Location\n• 🎨 Hobbies & Interests\n\nWhat would you like to explore?`;

      } else {
        aiResponse = `Interesting query. I'm optimized to discuss Sahil's projects, internships, skills, vision, research, certifications, journey, and more. Try asking about any of those, or type "help" to see all topics!`;
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsLoading(false);
    }, 1000);
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
