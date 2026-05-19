/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { Facebook, Phone, MapPin, Fish, Tent, Home, Utensils, Star, Quote, ExternalLink, ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const IMAGES = [
  "https://i.postimg.cc/Qt7PFWyJ/472449718-1702120307399305-6745962935599040663-n.jpg",
  "https://i.postimg.cc/zBhMyRQ8/472260653-1702129577398378-3480770250556205752-n.jpg",
  "https://i.postimg.cc/bJnMZ25P/472356021-1702129387398397-8318538081265545233-n.jpg",
  "https://i.postimg.cc/cH3jv8bc/472400706-1702120247399311-3388606341169657542-n.jpg",
  "https://i.postimg.cc/wvNP1sGw/472406513-1702120264065976-4944883358931342432-n.jpg",
  "https://i.postimg.cc/Jhvv7QPK/472409662-1702112087400127-7437233788235430511-n.jpg",
  "https://i.postimg.cc/s2qqfJwW/472429388-1702112064066796-4386076387486881729-n.jpg",
  "https://i.postimg.cc/j5f9DJ1b/472134403-1702129227398413-4328524525747104102-n.jpg",
  "https://i.postimg.cc/CKXXM4mc/472449727-1702115720733097-6288054252345424757-n.jpg",
  "https://i.postimg.cc/tgwwRz2r/472452711-1702118280732841-9113050433359928228-n.jpg",
  "https://i.postimg.cc/76zc5TWg/472457518-1702112097400126-3418088801076870283-n.jpg",
  "https://i.postimg.cc/ZRNgWyMV/472496379-1702120214065981-6523335540225329811-n.jpg",
  "https://i.postimg.cc/85v37rY8/472523958-1702112050733464-6891118873609050607-n.jpg",
  "https://i.postimg.cc/TwbSKW4z/472535052-1702112080733461-3323114892124443024-n.jpg",
  "https://i.postimg.cc/sXW8MZNN/472619013-1702112160733453-1352577078055660872-n.jpg",
  "https://i.postimg.cc/g0QQcKNN/472682377-1702116187399717-7664350035908975982-n.jpg",
  "https://i.postimg.cc/FRSqYJBn/472717592-1702112164066786-5304655685803671567-n.jpg",
  "https://i.postimg.cc/76zc5TW3/472718236-1702118057399530-6445847129810511451-n.jpg",
  "https://i.postimg.cc/JnXgsB2x/472791188-1702120180732651-1333961859216084166-n.jpg"
];

const REVIEWS = [
  {
    text: "Fantastyczna ryba i miła obsługa. Polecam zarówno rybę smażoną jak i wędzoną. Świeża i pyszna.",
    author: "Opinia z Facebooka"
  },
  {
    text: "Pyszna rybka, piękne miejsce i wspaniali właściciele😊",
    author: "Opinia z Facebooka"
  },
  {
    text: "Piękne miejsce i zjawiskowe miejsce, ryby palce lizać 😍",
    author: "Opinia z Facebooka"
  }
];

const WaveToBlue = () => (
  <div className="relative w-full overflow-hidden leading-[0] translate-y-[1px]">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-blue">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
    </svg>
  </div>
);

const WaveToWhite = () => (
  <div className="relative w-full overflow-hidden leading-[0] -translate-y-[1px]">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-white">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V92.65A600.21,600.21,0,0,1,321.39,56.44Z"></path>
    </svg>
  </div>
);

const SectionLabel = ({ text, light = false }: { text: string; light?: boolean }) => (
  <div className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-4 flex items-center gap-2 ${light ? 'text-white' : 'text-blue'}`}>
    <span>~ {text}</span>
  </div>
);

const SectionTitle = ({ title, light = false }: { title: string; light?: boolean }) => {
  return (
    <div className="relative inline-block mb-12">
      <h2 className={`text-4xl md:text-5xl font-display font-semibold ${light ? 'text-white' : 'text-text-main'}`}>
        {title}
      </h2>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 1, ease: "circOut" }}
        className="absolute -bottom-2 left-0 w-10 h-[1px] bg-wood origin-left"
      />
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: 'O nas', href: '#o-nas' },
    { name: 'Oferta', href: '#oferta' },
    { name: 'Noclegi', href: '#noclegi' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  const openLightbox = (idx: number) => setSelectedImage(idx);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) setSelectedImage((selectedImage + 1) % IMAGES.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) setSelectedImage((selectedImage - 1 + IMAGES.length) % IMAGES.length);
  };

  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="min-h-screen bg-white premium-texture overflow-x-hidden">
      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] bg-blue-deep/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
        >
          <button className="absolute top-6 right-6 text-white hover:text-wood transition-colors z-[110]">
            <X size={40} />
          </button>
          
          <button onClick={prevImage} className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors">
            <ChevronLeft size={60} strokeWidth={1} />
          </button>
          
          <motion.img 
            key={selectedImage}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={IMAGES[selectedImage]} 
            className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10"
            alt="Powiększone zdjęcie"
            onClick={(e) => e.stopPropagation()}
          />

          <button onClick={nextImage} className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors">
            <ChevronRight size={60} strokeWidth={1} />
          </button>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-white/40 text-xs tracking-[0.4em]">
            {selectedImage + 1} / {IMAGES.length}
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-wood-light py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-wood-light">
              <img src="https://i.postimg.cc/sX0FWrjP/327153676-1210847586515638-6766816412882247260-n.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className={`font-display font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-blue' : 'text-white'}`}>
              Wigry 5
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase group relative transition-colors ${scrolled ? 'text-text-main hover:text-blue' : 'text-white/90 hover:text-white'}`}
              >
                {link.name}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-wood transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors ${scrolled ? 'text-blue' : 'text-white'}`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-wood shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-display text-text-main hover:text-blue transition-colors border-b border-bg-section pb-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-blue">
        <motion.div style={{ y: heroParallax }} className="absolute inset-0 z-0">
          <img 
            src={IMAGES[1]} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-deep/80 via-transparent to-blue" />
        </motion.div>

        {/* Decorative Dock Lines */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="fill-none stroke-wood-light">
            <line x1="10" y1="0" x2="10" y2="100" strokeWidth="0.1" />
            <line x1="30" y1="0" x2="30" y2="100" strokeWidth="0.1" />
            <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.1" />
            <line x1="70" y1="0" x2="70" y2="100" strokeWidth="0.1" />
            <line x1="90" y1="0" x2="90" y2="100" strokeWidth="0.1" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel text="Tradycja znad Wigier" light />
            <h1 className="text-white text-[clamp(2.5rem,8vw,6.5rem)] font-display leading-[0.9] font-bold mb-6 tracking-tight">
              Smażalnia Ryb <br />
              <span className="italic font-medium">Wigry 5</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Poczuj smak najświeższej ryby prosto z wędzarni, odpocznij na naszym campingu i zachwyć się magią Wigierskiego Parku Narodowego.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#oferta" className="px-10 py-4 bg-white text-blue font-semibold rounded-none hover:bg-wood hover:text-white transition-all duration-300 uppercase text-xs tracking-[0.2em]">
                Nasza Oferta
              </a>
              <a href="#kontakt" className="px-10 py-4 border border-white/30 text-white font-semibold rounded-none hover:bg-white hover:text-blue transition-all duration-300 uppercase text-xs tracking-[0.2em] backdrop-blur-sm">
                Zarezerwuj
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Sections Wrapper */}
      <main>
        {/* About / Intro Section - WHITE */}
        <section id="o-nas" className="section-white py-32 md:py-48 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-bg-section overflow-hidden rounded-sm border-[1px] border-wood-light/30 shadow-[0_40px_100px_-20px_rgba(3,30,46,0.15)] relative">
                <img 
                  src={IMAGES[5]} 
                  alt="Klimat Wigier" 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-12 -right-12 glass-card p-10 bg-white shadow-2xl hidden lg:block border-wood/30 border-t-2"
              >
                <div className="font-hand text-blue text-5xl mb-3">Prawdziwy smak</div>
                <div className="text-xs font-mono uppercase tracking-[0.4em] text-text-muted">Prosto z serca natury</div>
              </motion.div>
              
              {/* Wood Accent Line */}
              <div className="absolute top-1/2 -left-12 w-24 h-[1px] bg-wood hidden xl:block" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionLabel text="NASZA HISTORIA" />
              <SectionTitle title="Tradycja smaku pielęgnowana przez lata" />
              <p className="text-text-muted text-xl mb-12 leading-relaxed font-light">
                Wigry 5 to miejsce, gdzie czas zwalnia, a smak nabiera głębi. Nasza pasja do rybołówstwa i tradycyjnych receptur sprawia, że każda chwila spędzona u nas jest wyjątkowym doświadczeniem.
              </p>
              <a href="https://www.facebook.com/SmazalniaRybWigry5" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-blue hover:text-wood transition-all duration-300 font-bold uppercase text-[10px] tracking-[0.3em] pb-1 border-b border-transparent hover:border-wood">
                POZNAJ NASZĄ PASJĘ <ExternalLink size={14} />
              </a>
            </motion.div>
          </div>
        </section>

        <WaveToBlue />

        {/* Offer Section - BLUE */}
        <section id="oferta" className="section-blue py-32 md:py-48 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="premium-texture absolute inset-0" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-24">
              <SectionLabel text="SZACOWNA KARTA" light />
              <SectionTitle title="Specjały Wigierskiego Stołu" light />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { 
                  icon: <Fish className="text-wood" size={36} strokeWidth={1} />, 
                  title: "Dania Rybne", 
                  desc: "Złocista ryba smażona z troską, której smak definiuje region wigierski." 
                },
                { 
                  icon: <Utensils className="text-wood" size={36} strokeWidth={1} />, 
                  title: "Dania Regionalne", 
                  desc: "Kartacze i podlaskie smaki, przygotowywane według pokoleniowych receptur." 
                },
                { 
                  icon: <Quote className="text-wood" size={36} strokeWidth={1} />, 
                  title: "Wędzarnia", 
                  desc: "Aromat olchowego dymu i cierpliwość — sekret naszych słynnych ryb wędzonych." 
                },
                { 
                  icon: <Home className="text-wood" size={36} strokeWidth={1} />, 
                  title: "Swojskie Wędliny", 
                  desc: "Tradycyjne wyroby mięsne, które smakiem dorównują najlepszym wspomnieniom." 
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -15 }}
                  className="glass-card p-10 group transition-all duration-500 border-white/5 bg-white/5"
                >
                  <div className="mb-8 p-4 bg-white/5 inline-block rounded-none border-l border-wood/30 group-hover:bg-wood/20 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4 tracking-wide">{item.title}</h3>
                  <p className="text-white/60 text-base leading-relaxed mb-8 font-light">
                    {item.desc}
                  </p>
                  <div className="font-mono text-[9px] text-gold uppercase tracking-[0.4em] pt-4 border-t border-white/10 group-hover:text-white transition-colors">
                    Eksploruj Smak
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
        </section>

        <WaveToWhite />

        {/* Accommodation Section - WHITE */}
        <section id="noclegi" className="section-white py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col gap-32">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <SectionLabel text="STREFA RELAKSU" />
                <SectionTitle title="Pole Campingowe & Noclegi" />
                <p className="text-text-muted text-lg leading-relaxed mb-10">
                  Przystanek idealny dla pasjonatów natury. Oferujemy przestronne pole campingowe z pełnym zapleczem oraz przytulne domki noclegowe, gdzie poranna kawa smakuje najlepiej przy śpiewie ptaków.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-bg-soft text-blue rounded-none border-l-4 border-wood">
                      <Tent size={24} />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold">Pole Campingowe</h4>
                      <p className="text-text-muted text-sm">Nowoczesne sanitariaty, przyłącza prądu i mnóstwo zieleni.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-bg-soft text-blue rounded-none border-l-4 border-wood">
                      <Home size={24} />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold">Domki Noclegowe</h4>
                      <p className="text-text-muted text-sm">Komfortowe domki o wysokim standardzie dla rodzin i par.</p>
                    </div>
                  </div>
                </div>
                <a href="#kontakt" className="inline-block mt-12 px-10 py-4 bg-blue text-white font-semibold rounded-none hover:bg-gold transition-all duration-300 uppercase text-xs tracking-[0.2em]">
                  Sprawdź Dostępność
                </a>
              </div>
              <div className="relative group">
                <div className="aspect-video bg-bg-section overflow-hidden rounded-sm shadow-2xl">
                  <img 
                    src={IMAGES[0]} 
                    alt="Camping Wigry 5" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* Floating Wood Accent */}
                <div className="absolute -top-6 -right-6 w-32 h-32 border-wood border-b-[2px] border-r-[2px] z-[-1]" />
              </div>
            </div>
          </div>
        </section>

        <WaveToBlue />

        {/* Gallery Section - BLUE */}
        <section id="galeria" className="section-blue py-32 px-6 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20">
              <SectionLabel text="GALERIA" light />
              <SectionTitle title="Uchwycone w obiektywie" light />
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {(isGalleryExpanded ? IMAGES : IMAGES.slice(0, 8)).map((img, idx) => (
                <motion.div 
                  key={idx}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.02 }}
                  onClick={() => openLightbox(isGalleryExpanded ? idx : idx)}
                  className="relative group overflow-hidden bg-blue-deep rounded-sm border border-white/10 cursor-zoom-in"
                >
                  <img 
                    src={img} 
                    alt={`Galeria ${idx}`} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-blue-deep/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border border-white/50 flex items-center justify-center text-white backdrop-blur-sm">
                      <ChevronRight size={24} className="ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {IMAGES.length > 8 && (
              <div className="mt-20 text-center">
                <button 
                  onClick={() => setIsGalleryExpanded(!isGalleryExpanded)}
                  className="group relative px-12 py-5 bg-transparent border border-white/20 text-white font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-blue transition-all duration-300"
                >
                  <span className="relative z-10">{isGalleryExpanded ? 'Zwiń Galerię' : 'Rozwiń Galerię'}</span>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold transition-all duration-500 group-hover:w-full`} />
                </button>
              </div>
            )}
          </div>
        </section>

        <WaveToWhite />

        {/* Reviews Section - WHITE */}
        <section className="section-white py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <SectionLabel text="OPINIE" />
              <SectionTitle title="Co mówią nasi goście?" />
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {REVIEWS.map((review, idx) => (
                <div key={idx} className="relative p-10 bg-bg-section border-t-4 border-wood shadow-sm flex flex-col h-full">
                  <div className="text-wood mb-6 flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <blockquote className="text-text-main text-lg italic leading-relaxed mb-8 flex-grow">
                    "{review.text}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue flex items-center justify-center text-white rounded-full">
                      <Facebook size={20} />
                    </div>
                    <div className="text-xs font-mono uppercase tracking-widest text-text-muted">
                      {review.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <a 
                href="https://www.facebook.com/SmazalniaRybWigry5/reviews/?id=100064668615221&sk=reviews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-12 py-5 border-[1px] border-blue text-blue hover:bg-blue hover:text-white transition-all duration-300 font-bold uppercase text-[10px] tracking-[0.3em] inline-flex items-center gap-3"
              >
                Zobacz wszystkie opinie na Facebook <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        <WaveToBlue />

        {/* Contact Section - BLUE */}
        <section id="kontakt" className="section-blue py-32 md:py-48 px-6 relative overflow-hidden">
          <div className="premium-texture absolute inset-0 opacity-20 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 relative z-10">
            <div>
              <SectionLabel text="BĄDŹMY W KONTAKCIE" light />
              <SectionTitle title="Zapraszamy do Wigier 5" light />
              <p className="text-white/60 text-xl leading-relaxed mb-16 font-light">
                Chętnie odpowiemy na Twoje pytania, przygotujemy catering lub zarezerwujemy miejsce na camping. Odpocznij tam, gdzie jezioro spotyka się z tradycją.
              </p>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                <a href="tel:601382842" className="group block">
                  <div className="font-mono text-[9px] text-gold uppercase tracking-[0.4em] mb-4">Rezerwacje telefoniczne</div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 glass-card flex items-center justify-center group-hover:bg-wood group-hover:text-white transition-all duration-500">
                      <Phone size={20} className="text-wood group-hover:text-white" />
                    </div>
                    <div className="text-3xl font-display font-bold group-hover:text-gold transition-colors tracking-tight">601 382 842</div>
                  </div>
                </a>

                <div className="group">
                  <div className="font-mono text-[9px] text-gold uppercase tracking-[0.4em] mb-4">Adres restauracji</div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 glass-card flex items-center justify-center">
                      <MapPin size={20} className="text-wood" />
                    </div>
                    <div className="text-3xl font-display font-bold tracking-tight">Wigry 5, 16-402</div>
                  </div>
                </div>

                <a href="https://www.facebook.com/SmazalniaRybWigry5" target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="font-mono text-[9px] text-gold uppercase tracking-[0.4em] mb-4">Media społecznościowe</div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 glass-card flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                      <Facebook size={20} className="text-wood group-hover:text-white" />
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-full min-h-[500px] glass-card overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2341.247496425458!2d23.088257294773953!3d54.06935414950045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e0fc11fae5e157%3A0x1a386a45fb1394!2sWigry%205!5e0!3m2!1spl!2spl!4v1779178319807!5m2!1spl!2spl" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {/* Decorative corners */}
              <div className="absolute -top-6 -left-6 w-16 h-16 border-wood border-t-2 border-l-2 opacity-50" />
              <div className="absolute -bottom-6 -right-6 w-16 h-16 border-wood border-b-2 border-r-2 opacity-50" />
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-deep text-white py-20 px-6 border-t-2 border-wood">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-8">
                <img src="https://i.postimg.cc/sX0FWrjP/327153676-1210847586515638-6766816412882247260-n.png" alt="Logo" className="w-12 h-12 rounded-full border border-wood-light" />
                <span className="font-display font-bold text-3xl tracking-tight">Smażalnia Ryb <br /> Wigry 5</span>
              </div>
              <p className="text-white/50 leading-relaxed mb-8">
                Smażymy, wędzimy i goszczymy z uśmiechem od lat. Odkryj prawdziwe Mazury w sercu Suwalszczyzny.
              </p>
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
                &copy; {new Date().getFullYear()} Wigry 5. Wszystkie prawa zastrzeżone.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-6">
                <div className="font-mono text-[10px] text-wood uppercase tracking-widest font-bold">Nawigacja</div>
                <div className="flex flex-col gap-4 text-white/70">
                  {navLinks.map(link => (
                    <a key={link.name} href={link.href} className="hover:text-gold transition-colors">{link.name}</a>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="font-mono text-[10px] text-wood uppercase tracking-widest font-bold">Zapraszamy</div>
                <div className="text-white/70 leading-relaxed">
                  Pn - Pt: 10:00 - 20:00 <br />
                  Sb - Nd: 09:00 - 21:00 <br />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Persistent CTA Button */}
      <motion.a 
        href="tel:601382842"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-wood text-white rounded-full flex items-center justify-center shadow-2xl md:hidden"
      >
        <Phone size={24} />
      </motion.a>
    </div>
  );
}
