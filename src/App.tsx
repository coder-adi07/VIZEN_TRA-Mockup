/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Layers, 
  Palette, 
  Camera, 
  Package, 
  Monitor, 
  Instagram, 
  Twitter, 
  Linkedin,
  Menu,
  X,
  Plus,
  Play
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// --- Components ---

const LogoLink = ({ className = "" }: { className?: string }) => (
  <motion.a 
    href="/"
    whileHover={{ scale: 1.02 }}
    className={`flex items-center gap-3 group ${className}`}
  >
    <div className="relative w-12 h-12 flex items-center justify-center p-1 bg-white rounded-sm overflow-hidden border border-white/10 shadow-xl">
      <img 
        src="/logo.png" 
        alt="VIZEN_TRA Logo" 
        className="w-full h-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.innerHTML = '<div class="text-brand-red font-black text-2xl rotate-45">V</div>';
          }
        }}
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-brand-red transition-colors">VIZEN_TRA</span>
      <span className="text-[8px] uppercase tracking-[0.3em] text-neutral-500">Voir. Créer. Impacter.</span>
    </div>
  </motion.a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'premium-blur py-4' : 'py-8'} px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <LogoLink />

        <div className="hidden md:flex gap-12 font-display text-[10px] items-center font-bold uppercase tracking-[0.25em] text-white/70">
          {['Works', 'Services', 'About', 'Contact'].map((item, i) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="hover:text-brand-red transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-red transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="ml-6 px-6 py-2 border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all text-[9px]"
          >
            Start Project
          </motion.button>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-brand-red transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 bg-brand-black z-[40] flex flex-col items-center justify-center gap-12 md:hidden"
          >
            {['Works', 'Services', 'About', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-brand-red transition-colors flex items-center gap-4"
              >
                <Plus size={24} className="text-brand-red" />
                {item}
              </a>
            ))}
            <div className="mt-12 flex gap-8">
              <Instagram size={20} className="text-white/50" />
              <Twitter size={20} className="text-white/50" />
              <Linkedin size={20} className="text-white/50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 overflow-hidden bg-brand-black select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full min-h-[80vh]">
        
        <div className="lg:col-span-8 z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-brand-red" />
              <span className="text-brand-red font-display font-medium text-[10px] tracking-[0.5em] uppercase block">
                Visionary Agency
              </span>
            </div>
            <h1 className="text-7xl md:text-[9rem] font-display font-bold leading-[0.85] tracking-tightest mb-10 text-white mix-blend-difference">
              Voir. Créer. <br />
              <span className="inline-block relative">
                Impacter.
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-4 left-0 h-2 bg-brand-red -z-10"
                />
              </span>
            </h1>
            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
              <p className="text-neutral-500 text-sm md:text-base max-w-sm font-light leading-relaxed">
                Design that cuts through the noise. We build minimalist visual identities for brands that demand attention.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-red text-white pr-10 pl-6 py-6 font-bold uppercase tracking-widest flex items-center gap-6 group transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 group-hover:text-brand-black transition-colors duration-500">Work With Us</span>
                <ArrowRight className="relative z-10 group-hover:text-brand-black transition-colors duration-500 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-4 relative flex justify-center lg:justify-end h-full min-h-[400px]">
          <motion.div 
            style={{ y: y1 }}
            className="w-full max-w-[320px] aspect-[3/4] bg-neutral-900 overflow-hidden relative border border-white/5 shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600" 
              alt="Design Detail" 
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
            <div className="absolute top-6 right-6">
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-[10px] text-white/50 backdrop-blur-sm">
                01
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            style={{ y: y2 }}
            className="absolute -bottom-20 -left-6 lg:-left-20 w-[180px] aspect-[1/1.2] bg-brand-red p-6 flex flex-col justify-end gap-4 shadow-2xl"
          >
            <Play fill="white" className="w-8 h-8" />
            <p className="text-white font-display font-bold text-xs leading-tight tracking-wider uppercase">
              Showreel <br /> 2024
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 flex gap-12 font-display text-[9px] tracking-[0.4em] text-white/20">
        <span>NEW YORK</span>
        <span>/</span>
        <span>PARIS</span>
        <span>/</span>
        <span>TOKYO</span>
      </div>

      <div className="noise-overlay fixed inset-0 z-40 pointer-events-none" />
    </section>
  );
};

interface WorkItemProps {
  work: any;
  index: number;
  key?: any;
}

const WorkItem = ({ work, index }: WorkItemProps) => {
  const isLarge = index === 0 || index === 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: index * 0.1 }}
      className={`group relative overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
    >
      <div className="relative aspect-[16/9] md:aspect-auto md:h-full min-h-[400px]">
        <img 
          src={work.image} 
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-premium group-hover:scale-105 opacity-60 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/0 transition-all duration-700" />
        
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="flex justify-between items-start">
             <span className="text-[10px] tracking-[.5em] font-bold text-white/50">{work.category}</span>
             <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white -rotate-45" />
             </div>
           </div>
           <div>
             <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{work.title}</h3>
             <p className="text-[10px] tracking-[.3em] font-medium text-brand-red">VIEW CASE STUDY</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const WorkSection = () => {
  const works = [
    {
      title: "Onyx Visuals",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
      id: "work-1"
    },
    {
      title: "Pulse Digital",
      category: "Social Media",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      id: "work-2"
    },
    {
      title: "Kore Space",
      category: "Architecture Branding",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      id: "work-3"
    },
    {
      title: "Zenith Identity",
      category: "Luxury Assets",
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1200",
      id: "work-4"
    }
  ];

  return (
    <section id="works" className="py-40 bg-brand-black px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-xl">
             <span className="text-brand-red font-display font-bold text-[10px] tracking-[0.5em] mb-6 block">PROJECTS</span>
             <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9]">
               Selected <br /> <span className="text-white/20 group-hover:text-white transition-colors duration-500">Creatives.</span>
             </h2>
          </div>
          <p className="text-neutral-500 max-w-xs text-sm font-light mt-4">
             A curation of our finest visual strategies developed for industry leaders and visionary startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {works.map((work, i) => (
            <WorkItem key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    { title: "Visual Identity", icon: <Palette className="w-6 h-6" />, tag: "CORE" },
    { title: "Motion Systems", icon: <Layers className="w-6 h-6" />, tag: "DYNAMIC" },
    { title: "Digital Solutions", icon: <Monitor className="w-6 h-6" />, tag: "UI/UX" },
    { title: "Brand Strategy", icon: <ArrowRight className="rotate-[-45deg] w-6 h-6" />, tag: "LOGIC" },
    { title: "Product Design", icon: <Package className="w-6 h-6" />, tag: "FORM" },
    { title: "Content Creation", icon: <Camera className="w-6 h-6" />, tag: "VISION" }
  ];

  return (
    <section id="services" className="py-40 px-6 md:px-12 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-5">
            <span className="text-brand-red font-display font-bold text-[10px] tracking-[0.5em] mb-6 block uppercase">What we deliver</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 leading-none tracking-tight">Pure design <br /> Intelligence.</h2>
            <p className="text-neutral-400 font-light leading-relaxed mb-12">
              We specialize in the intersection of minimalism and impact. Every deliverable is custom-tailored to solve specific brand evolution needs.
            </p>
            <div className="p-8 bg-brand-red/5 border border-brand-red/20 group hover:bg-brand-red/1 transition-colors cursor-pointer">
              <h4 className="text-xs font-bold tracking-widest text-brand-red mb-4">LATEST CAPABILITY</h4>
              <p className="text-xl font-display font-bold text-white group-hover:translate-x-2 transition-transform">AI Driven Brand Research Experts</p>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <motion.div 
                key={service.title}
                whileHover={{ y: -5 }}
                className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 p-8 flex flex-col justify-between aspect-square group hover:border-brand-red/40 transition-colors"
              >
                <div className="flex justify-between items-start">
                   <div className="p-4 bg-brand-black border border-white/5 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors duration-500">
                     {service.icon}
                   </div>
                   <span className="text-[10px] tracking-[.3em] font-bold text-white/20 group-hover:text-brand-red/50 transition-colors uppercase">{service.tag}</span>
                </div>
                <h3 className="text-2xl font-display font-bold group-hover:text-brand-red transition-colors">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TextReveal = ({ text }: { text: string }) => {
  return (
    <div className="overflow-hidden py-4">
      <motion.p
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="text-white"
      >
        {text}
      </motion.p>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-48 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
        
        <div className="lg:col-span-8">
           <span className="text-brand-red font-display font-bold text-[10px] tracking-[0.5em] mb-12 block uppercase">Our Essence</span>
           <div className="space-y-4">
             <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-brand-black leading-[1.05]">
                We help brands stand out <br /> with impactful visuals <br /> and strategic design.
             </h2>
             <div className="h-2 w-32 bg-brand-red mt-12" />
           </div>

           <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="text-neutral-500 font-light leading-relaxed space-y-6">
                <p>
                  Minimalism isn't just an aesthetic choice; it's a strategic decision. At VIZEN_TRA, we believe that the most effective identity is one that removes unnecessary complexity.
                </p>
             </div>
             <div className="text-neutral-500 font-light leading-relaxed space-y-6">
                <p>
                  Our New York based studio serves as a laboratory for visual innovation. We combine technological foresight with classical design principles to create timeless brand systems.
                </p>
             </div>
           </div>
        </div>

        <div className="lg:col-span-4 relative group">
           <div className="aspect-[1/1.2] bg-brand-black overflow-hidden relative border border-white/5">
             <img 
               src="https://images.unsplash.com/photo-1542641728-6ca359b085f4?auto=format&fit=crop&q=80&w=600" 
               alt="Studio vibe" 
               className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
               referrerPolicy="no-referrer"
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
               <div className="w-24 h-24 border border-white/20 rounded-full animate-ping opacity-20" />
               <div className="w-12 h-12 bg-white flex items-center justify-center shadow-xl group-hover:scale-125 transition-transform">
                 <Play size={20} className="text-brand-red" fill="currentColor" />
               </div>
             </div>
           </div>
           <div className="mt-8">
              <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400">FOUNDED NYC, 2024</span>
           </div>
        </div>
      </div>

       {/* Decorative */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-50/50 -z-10" />
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-black pt-48 pb-12 px-6 md:px-12 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
         
        {/* Large Brand Title */}
        <div className="mb-48 border-b border-white/5 pb-24">
           <h2 className="text-[12vw] font-display font-bold tracking-tightest leading-none text-white/5 text-center hover:text-white transition-all duration-700 cursor-default select-none uppercase">
             VIZEN TRA.
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-48">
          <div className="lg:col-span-1">
            <LogoLink className="mb-8" />
            <p className="text-neutral-500 font-light leading-relaxed max-w-sm mb-12 text-sm italic">
              "Voir. Créer. Impacter." — See the future, create the identity, impact the world.
            </p>
            <div className="flex gap-8">
              {['Insta', 'Twit', 'Linkd'].map(social => (
                <a key={social} href="#" className="text-[10px] uppercase font-bold tracking-widest text-neutral-600 hover:text-brand-red transition-colors decoration-brand-red underline-offset-4 hover:underline">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-300 mb-12">Navigate</h4>
            <div className="flex flex-col gap-6 text-neutral-500 uppercase tracking-widest text-[10px] font-bold">
              {['Works', 'Services', 'About', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-brand-red transition-colors flex items-center justify-between group">
                  {link}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-300 mb-12">Inquiries</h4>
            <div className="flex flex-col gap-6 text-neutral-500 text-sm font-light">
              <a href="mailto:hello@vizentra.com" className="hover:text-white transition-colors underline-offset-8 underline decoration-brand-red/30 hover:decoration-brand-red">hello@vizentra.com</a>
              <p className="tracking-widest">+1 (234) 567 890</p>
              <p className="leading-relaxed opacity-60">123 Creative Street, Studio 4A<br />New York, NY 10001</p>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-300 mb-12">Awards</h4>
            <div className="flex flex-col gap-6 text-neutral-500 text-[10px] font-bold tracking-[0.2em]">
               <div>
                  <p className="text-white/80">Site of the Day</p>
                  <p className="text-[8px] opacity-40">Awwwards / 2024</p>
               </div>
               <div>
                  <p className="text-white/80">Mobile Excellence</p>
                  <p className="text-[8px] opacity-40">FWA / 2023</p>
               </div>
               <div>
                  <p className="text-white/80">Best Identity</p>
                  <p className="text-[8px] opacity-40">UX Design Awards / 2024</p>
               </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[8px] uppercase tracking-[0.6em] text-neutral-700 font-bold gap-8">
          <p>© 2024 VIZEN_TRA AGENCY. ESTABLISHED IN NEW YORK.</p>
          <div className="flex gap-12 font-black">
             <span className="text-neutral-800">CRAFTED FOR EXCELLENCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="scroll-smooth bg-brand-black selection:bg-brand-red selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        
        {/* Simplified Premium CTA */}
        <section className="py-40 bg-white relative overflow-hidden group">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="max-w-7xl mx-auto px-6 text-center"
           >
              <h2 className="text-[10vw] font-display font-bold tracking-tightest leading-none text-brand-black mb-12 uppercase group-hover:scale-95 transition-transform duration-1000">
                Let's Build.
              </h2>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center justify-center w-48 h-48 rounded-full border-2 border-brand-red text-brand-red font-bold text-xs tracking-widest uppercase hover:bg-brand-red hover:text-white transition-all transition-premium"
              >
                Get Started
              </motion.a>
           </motion.div>
           {/* Decorative eye background */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-100 text-[40vw] -z-10 font-display select-none pointer-events-none opacity-50">
             V
           </div>
        </section>
      </main>

      <Footer />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-red z-[100] origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />
    </div>
  );
}
