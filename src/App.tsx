import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, ExternalLink, Code2, Database, Terminal,
  Brain, Award, MapPin, Calendar, Briefcase, GraduationCap,
  Sparkles, Rocket, Send, ChevronRight, BookOpen, PenTool,
  Target, Zap, Globe, ShieldCheck, Cpu, Instagram, Heart, FileText
} from 'lucide-react';
import { RESUME_DATA } from './constants';
import AIChat from './components/AIChat';

const TypingEffect = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : 150, parseInt((Math.random() * 350).toString())));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className="neon-text-blue min-h-[1.5em] inline-block">
      {texts[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Section = ({ children, id, title, subtitle }: { children: React.ReactNode, id: string, title?: string, subtitle?: string }) => (
  <section id={id} className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
    {title && (
      <div className="mb-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold mb-4 cursor-default"
        >
          {title.split(' ').map((word, i) => (
            <span key={i} className={i === title.split(' ').length - 1 ? 'text-gradient-neon' : ''}>
              {word}{' '}
            </span>
          ))}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    )}
    {children}
  </section>
);

const IconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap />,
  Terminal: <Terminal />,
  Brain: <Brain />,
  Sparkles: <Sparkles />,
  Rocket: <Rocket />,
  Cpu: <Cpu />,
  Globe: <Globe />,
  ShieldCheck: <ShieldCheck />,
  Zap: <Zap />
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in all fields before sending.');
      return;
    }
    setFormError('');
    setFormSending(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/sahilpatilkmp850@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact from ${formData.name}`,
          _captcha: 'false',
        }),
      });
      if (response.ok) {
        setFormSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormSent(false), 6000);
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setFormSending(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-neon-purple/30">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="absolute -top-3 -left-2 bg-neon-blue text-black text-[11px] font-black px-2 py-0.5 rounded-sm tracking-tighter z-10 shadow-[0_0_10px_#00f0ff80]">
              S
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-neon-blue transition-all duration-500">
                <img
                  src="/sahil_photo.png"
                  alt="Sahil Patil"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter uppercase">
                SAHIL <span className="text-neon-blue group-hover:text-neon-purple transition-colors">PATIL</span>
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest uppercase text-slate-400">
            {['About', 'Journey', 'Internships', 'Projects', 'Research', 'Vision', 'Arsenal', 'Expertise', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hover:text-neon-blue transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-blue transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1 space-y-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-neon-purple font-mono text-sm tracking-[0.3em] uppercase">{RESUME_DATA.role}</h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter">
              Architecting the Future <br />
              <span className="text-gradient-neon">Through Engineering Excellence</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-display font-medium text-slate-300"
          >
            I am a <TypingEffect texts={[
              "Software Engineer",
              "AI Enthusiast",
              "Problem Solver",
              "System Architect"
            ]} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4"
          >
            <motion.a
              href="https://drive.google.com/file/d/1cAIlVmc3tuqRH1uA6CrdyA8skcj_6hoB/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00f0ff66" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-neon-blue text-black font-bold rounded-full flex items-center gap-2 transition-all"
            >
              <FileText size={20} />
              Download CV
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#8a2be280" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/10 text-white font-bold rounded-full flex items-center gap-2 hover:bg-white/5 transition-all"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Send size={20} />
              Get in Touch
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6"
          >
            <div className="flex items-center gap-4 text-slate-500">
              <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase">Building Robust & Scalable Foundations</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-neon-blue to-neon-purple rounded-full blur opacity-40 animate-pulse" />
            <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10 glass">
              <img
                src="/sahil_photo.png"
                alt="Sahil Patil"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          {/* Decorative elements */}
          <div className="absolute top-0 -right-4 w-20 h-20 bg-neon-blue/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 -left-4 w-32 h-32 bg-neon-purple/20 blur-3xl rounded-full" />
        </motion.div>
      </section>

      {/* About Section */}
      <Section id="about" title="Engineering Ethos">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-neon-blue mb-4">Executive Summary</h4>
            <p className="text-xl md:text-2xl font-display font-medium text-white leading-relaxed mb-6 text-justify">
              Software Engineer with a rigorous focus on Computer Science fundamentals and architectural clarity. I specialize in building high-performance systems by applying deep algorithmic thinking and structured design patterns. My approach bridges the gap between core computational theory and scalable, real-world AI applications, ensuring clarity, efficiency, and long-term maintainability.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-sm font-mono text-neon-purple">
                <GraduationCap size={16} />
                <span>Academic Standing: {RESUME_DATA.about.cgpa}</span>
              </div>
              <div className="hidden sm:block text-slate-600">&gt;</div>
              <div className="flex items-center gap-2 text-xs font-mono text-neon-green/80">
                <Terminal size={14} />
                <span>{RESUME_DATA.about.keySkills}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              {RESUME_DATA.about.intro}
            </p>
          </motion.div>

          <div className="flex items-center">
            <div className="grid grid-cols-2 gap-6 w-full">
              {[
                { label: 'Architecture', val: 'Resilient', icon: <Cpu className="text-neon-blue" /> },
                { label: 'Intelligence', val: 'Autonomous', icon: <Brain className="text-neon-purple" /> },
                { label: 'Data', val: 'High-Fidelity', icon: <Database className="text-neon-green" /> },
                { label: 'Execution', val: 'First-Principles', icon: <Terminal className="text-neon-blue" /> },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.02, boxShadow: "0 0 20px #00f0ff33" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 glass rounded-3xl border-white/5 hover:border-neon-blue/30 transition-all group cursor-default"
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <h4 className="text-2xl font-bold mb-1">{stat.val}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Journey Section */}
      <Section id="journey" title="Professional Growth Timeline" subtitle="A visual narrative of my technical evolution and milestones.">
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent" />

          <div className="space-y-20">
            {RESUME_DATA.journey.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="absolute left-[-8px] md:left-1/2 md:ml-[-8px] w-4 h-4 rounded-full bg-dark-base border-2 border-neon-blue z-10 shadow-[0_0_10px_#00f0ffff]" />

                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} pl-10`}>
                  <div className="p-8 glass rounded-3xl hover:neon-border-blue transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neon-blue mb-4 group-hover:scale-110 transition-transform">
                      {IconMap[item.icon]}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Internships Section */}
      <Section id="internships" title="Industry Exposure" subtitle="Hands-on experience in real-world engineering environments.">
        <div className="grid gap-8">
          {RESUME_DATA.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01, boxShadow: "0 0 30px #00f0ff1a" }}
              viewport={{ once: true }}
              className="p-10 glass rounded-[2.5rem] border-white/5 hover:border-neon-blue/30 transition-all group relative overflow-hidden cursor-default"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Briefcase size={80} />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-neon-blue font-mono text-sm">
                    <MapPin size={14} /> {exp.company} | {exp.location}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <Calendar size={14} /> {exp.period}
                </div>
              </div>
              <div className="space-y-4">
                {exp.description.map((point, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-blue" />
                    <p className="text-slate-300 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Vision Section */}
      <Section id="vision" title={RESUME_DATA.vision.title} subtitle="Visionary thinking for a future defined by intelligent systems.">
        <div className="grid md:grid-cols-2 gap-8">
          {RESUME_DATA.vision.content.map((v, i) => {
            const Icon = v.topic.includes('Algorithmic') ? Cpu :
              v.topic.includes('Fundamentals') ? GraduationCap :
                v.topic.includes('Principles') ? Zap :
                  v.topic.includes('Intelligence') ? Brain : Target;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 glass rounded-[2.5rem] border-white/5 hover:neon-border-purple transition-all group relative overflow-hidden`}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-neon-purple/5 rounded-full blur-3xl group-hover:bg-neon-purple/10 transition-all" />

                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-neon-purple/10 flex items-center justify-center text-neon-purple group-hover:scale-110 transition-transform">
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{v.topic}</h3>
                    <div className="h-1 w-12 bg-neon-purple mt-2 rounded-full opacity-50 group-hover:w-24 transition-all" />
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed text-lg max-w-3xl">{v.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Impact-Driven Innovations" subtitle="Real-world applications of AI, Data Science, and Software Engineering.">
        <div className="grid lg:grid-cols-2 gap-10">
          {RESUME_DATA.projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 0 40px #8a2be226" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass rounded-[3rem] overflow-hidden flex flex-col border-white/5 hover:border-neon-blue/30 transition-all cursor-default"
            >
              <div className="p-10 space-y-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold group-hover:text-neon-blue transition-colors">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(', ').map(t => (
                        <span key={t} className="text-[10px] font-mono text-neon-purple px-2 py-1 bg-neon-purple/10 rounded uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {project.link && (
                      <a href={project.link} className="p-3 glass rounded-full hover:text-neon-blue transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} className="p-3 glass rounded-full hover:text-neon-blue transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-6 flex-1">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Problem</h4>
                    <p className="text-sm text-slate-300">{project.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Solution</h4>
                    <p className="text-sm text-slate-300">{project.solution}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Impact</h4>
                    <p className="text-sm text-neon-green/80">{project.impact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Research Section */}
      <Section id="research" title="Research & Publications" subtitle="Academic and technical contributions to the field of intelligent systems.">
        <div className="grid md:grid-cols-2 gap-8">
          {RESUME_DATA.research?.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 glass rounded-[2.5rem] border-white/5 hover:border-neon-purple/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 rounded-2xl bg-neon-purple/10 text-neon-purple group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <span className="text-xs font-mono text-slate-500">{item.period}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-neon-purple transition-colors">{item.title}</h3>
              <p className="text-neon-blue text-sm font-medium mb-4">{item.publication}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-neon-purple transition-colors"
                >
                  View Certification <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Arsenal Section */}
      <Section id="arsenal" title="Technical Arsenal" subtitle="A curated collection of tools and technologies I leverage to build intelligence.">
        <div className="space-y-20">
          {[
            { cat: 'CS Fundamentals', items: RESUME_DATA.skills.fundamentals },
            { cat: 'Programming', items: RESUME_DATA.skills.programming },
            { cat: 'AI / Machine Learning', items: RESUME_DATA.skills.ai_ml },
            { cat: 'Data Visualization', items: RESUME_DATA.skills.data_visualization },
            { cat: 'Premium AI Tools', items: RESUME_DATA.skills.premium_tools },
            { cat: 'Web & Database', items: [...RESUME_DATA.skills.web, ...RESUME_DATA.skills.database] },
            { cat: 'Deployment', items: RESUME_DATA.skills.deployment }
          ].map((group, i) => (
            <div key={i} className="space-y-8">
              <h3 className="text-sm font-mono text-slate-500 uppercase tracking-[0.3em]">{group.cat}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {group.items.map((item, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 glass rounded-3xl flex flex-col items-center justify-center gap-4 group hover:neon-border-blue transition-all"
                  >
                    <div className="w-12 h-12 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                      <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Certifications Section */}
      <Section id="expertise" title="Validated Expertise" subtitle="Professional certifications and specialized knowledge acquired.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESUME_DATA.certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 glass rounded-[2rem] border-white/5 hover:neon-border-purple transition-all group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center text-neon-purple mb-6 group-hover:rotate-12 transition-transform">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold mb-4 leading-tight">{cert.name}</h3>
              <div className="space-y-2">
                {cert.skills.map(s => (
                  <div key={s} className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <div className="w-1 h-1 rounded-full bg-neon-purple" />
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Hobbies Section */}
      <Section id="hobbies" title="Beyond the Terminal" subtitle="Personal interests that fuel my creativity and analytical mindset.">
        <div className="grid sm:grid-cols-3 gap-8">
          {RESUME_DATA.about.hobbies.map((hobby, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 glass rounded-3xl border-white/5 hover:neon-border-purple transition-all group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center text-neon-purple mx-auto mb-6 group-hover:scale-110 transition-transform">
                {hobby.name.includes('Tech') ? <Cpu size={32} /> : hobby.name.includes('Manga') ? <BookOpen size={32} /> : hobby.name.includes('Sketching') ? <PenTool size={32} /> : <Heart size={32} />}
              </div>
              <h3 className="text-xl font-bold mb-2">{hobby.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{hobby.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Let's Build Something Impactful" subtitle="Open to collaborations, research discussions, and AI innovation.">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Ready to innovate?</h3>
              <p className="text-slate-400 leading-relaxed">
                I'm always looking for opportunities to apply my skills in AI and Data Science to solve meaningful problems. Whether you're a recruiter, a researcher, or a fellow developer, I'd love to connect.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Mail />, val: RESUME_DATA.email, label: 'Email' },
                { icon: <Linkedin />, val: 'LinkedIn', label: 'Professional Profile', link: `https://${RESUME_DATA.linkedin}` },
                { icon: <Github />, val: 'GitHub', label: 'Code Repository', link: `https://${RESUME_DATA.github}` },
                { icon: <Instagram />, val: 'Instagram', label: 'Social Connection', link: `https://${RESUME_DATA.instagram}` }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link || `mailto:${item.val}`}
                  target={item.link ? "_blank" : undefined}
                  className="flex items-center gap-6 p-6 glass rounded-3xl hover:neon-border-blue transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neon-blue group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.val}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="glass rounded-[3rem] p-10 space-y-8 border-white/5">
            {formSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green text-3xl">✓</div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-slate-400 text-sm">Your email client opened with the message pre-filled. Thank you for reaching out!</p>
              </motion.div>
            ) : (
              <>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-neon-blue transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-neon-blue transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-neon-blue transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>
                {formError && (
                  <p className="text-red-400 text-xs font-bold text-center tracking-widest uppercase">{formError}</p>
                )}
                <button
                  onClick={handleFormSubmit}
                  disabled={formSending}
                  className="w-full py-5 bg-neon-blue text-dark-base rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_#00f0ff99] transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formSending ? 'Sending...' : 'Send Message'} {formSending ? <span className="animate-spin">⏳</span> : <Send size={20} />}
                </button>
              </>
            )}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto space-y-8">
          <span className="font-display font-bold text-2xl tracking-tighter">
            SAHIL<span className="text-neon-blue">.</span>PATIL
          </span>
          <div className="space-y-4">
            <p className="text-slate-500 text-sm">
              Designed for the future. Built with purpose. <br />
              © {new Date().getFullYear()} Sahil Patil. All rights reserved.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-neon-blue/50 text-xs font-mono uppercase tracking-[0.2em]"
            >
              Thank you for visiting my digital space.
            </motion.div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIChat />
    </div>
  );
}
