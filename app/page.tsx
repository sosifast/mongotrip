"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Building2, TreePine, Navigation, Wrench, Briefcase, Camera, ArrowRight, Star, CalendarDays, ChevronDown } from "lucide-react";
import Header from "../layout/header";
import Footer from "../layout/footer";

const CATEGORIES = [
  { name: "Wisata", desc: "Alam & Kota", icon: MapPin, color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/30" },
  { name: "Museum", desc: "Seni & Sejarah", icon: Building2, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/30" },
  { name: "Cagar Alam", desc: "Hutan & Gunung", icon: TreePine, color: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-500/30" },
  { name: "Bisnis", desc: "Pusat Niaga", icon: Briefcase, color: "from-slate-600 to-slate-400", shadow: "shadow-slate-500/30" },
  { name: "Hotel", desc: "Penginapan", icon: Building2, color: "from-rose-500 to-orange-400", shadow: "shadow-rose-500/30" },
  { name: "Hidden Gems", desc: "Unik & Rahasia", icon: Wrench, color: "from-amber-500 to-yellow-400", shadow: "shadow-amber-500/30" },
];

const DESTINATIONS = [
  { title: "National Art Museum", category: "Museum", image: "/images/museum.png", rating: "4.9", reviews: "1.2k", price: "Mulai Rp 50.000" },
  { title: "Emerald Valley Reserve", category: "Cagar Alam", image: "/images/nature.png", rating: "4.8", reviews: "856", price: "Mulai Rp 25.000" },
  { title: "Old Town Workshop", category: "Hidden Gems", image: "/images/hidden.png", rating: "4.9", reviews: "2.4k", price: "Gratis" },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 min-h-[95vh] flex flex-col justify-center">
        {/* Background Parallax */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image 
            src="/images/hero.png" 
            alt="City view" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/20 to-stone-50" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center mt-12 lg:mt-24 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium mb-8 border border-white/20 text-white shadow-xl shadow-black/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Platform Eksplorasi No. 1 di Indonesia
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-8xl font-black tracking-tight text-white mb-6 drop-shadow-2xl"
          >
            Jelajahi Setiap <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">
              Sudut Tersembunyi
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-2xl text-stone-200 mb-16 max-w-3xl font-medium drop-shadow-md"
          >
            Dari wisata alam yang menenangkan hingga bengkel dan pabrik estetik yang belum pernah Anda kunjungi. Mongotrip membawamu ke sana.
          </motion.p>
          
          {/* Advanced Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-4xl bg-white p-2 rounded-2xl lg:rounded-full shadow-2xl shadow-brand-900/20 flex flex-col lg:flex-row items-center gap-2 border border-stone-200/50 backdrop-blur-xl"
          >
            <div className="flex-1 flex items-center px-6 py-4 w-full border-b lg:border-b-0 lg:border-r border-stone-100 group">
              <MapPin className="text-brand-500 mr-4 group-focus-within:scale-110 transition-transform" />
              <div className="flex flex-col text-left w-full">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Lokasi</span>
                <input type="text" placeholder="Mau ke mana?" className="w-full bg-transparent border-none outline-none text-stone-900 font-medium placeholder:font-normal placeholder:text-stone-300" />
              </div>
            </div>
            
            <div className="flex-1 flex items-center px-6 py-4 w-full border-b lg:border-b-0 lg:border-r border-stone-100 group">
              <CalendarDays className="text-brand-500 mr-4 group-focus-within:scale-110 transition-transform" />
              <div className="flex flex-col text-left w-full">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Tanggal</span>
                <input type="text" placeholder="Kapan saja" className="w-full bg-transparent border-none outline-none text-stone-900 font-medium placeholder:font-normal placeholder:text-stone-300" />
              </div>
            </div>

            <div className="flex-1 flex items-center px-6 py-4 w-full group">
              <Navigation className="text-brand-500 mr-4 group-focus-within:scale-110 transition-transform" />
              <div className="flex flex-col text-left w-full">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Kategori</span>
                <div className="flex items-center justify-between cursor-pointer">
                  <span className="text-stone-400">Pilih tipe</span>
                  <ChevronDown size={16} className="text-stone-400" />
                </div>
              </div>
            </div>

            <button className="w-full lg:w-auto mt-2 lg:mt-0 bg-gradient-to-r from-brand-500 to-brand-600 text-white px-8 py-5 rounded-xl lg:rounded-full font-semibold hover:shadow-lg hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
              <Search size={20} /> <span className="lg:hidden">Cari Destinasi</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories - Dynamic Grid */}
      <section className="pt-10 pb-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-black text-stone-900 mb-6 tracking-tight">Kategori <span className="text-brand-500">Eksplorasi</span></h2>
              <p className="text-lg text-stone-500 leading-relaxed">Dari keindahan alam hingga sudut kota tersembunyi. Temukan pengalaman yang paling cocok dengan karaktermu hari ini.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((cat, index) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-10 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-white border border-stone-100 rounded-3xl group-hover:scale-95 group-hover:rounded-[2rem] transition-all duration-500 shadow-sm" />
                
                <div className="relative h-full p-6 flex flex-col items-center justify-center text-center gap-4 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-lg ${cat.shadow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <cat.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg">{cat.name}</h3>
                    <p className="text-xs text-stone-500 font-medium mt-1">{cat.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations - Overlapping Layout */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-stone-50 rounded-b-[4rem]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-stone-900 mb-4 tracking-tight">Trending <span className="text-brand-500">Minggu Ini</span></h2>
              <p className="text-lg text-stone-500">Tempat-tempat unik yang sedang ramai dikunjungi.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-stone-900 font-bold hover:text-brand-500 transition-colors group">
              Eksplor Semua <span className="bg-stone-100 text-stone-900 group-hover:bg-brand-100 group-hover:text-brand-600 p-2 rounded-full transition-colors"><ArrowRight size={20} /></span>
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {DESTINATIONS.map((dest, index) => (
              <motion.div 
                key={dest.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl shadow-stone-200/50">
                  <Image 
                    src={dest.image} 
                    alt={dest.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/0 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Floating badges */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-stone-800 shadow-lg">
                    {dest.category}
                  </div>
                  
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-full text-stone-400 hover:text-brand-500 hover:bg-white transition-colors shadow-lg">
                    <Camera size={18} />
                  </div>
                </div>
                
                <div className="px-2 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-stone-900 leading-tight group-hover:text-brand-500 transition-colors pr-4">{dest.title}</h3>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 font-bold text-stone-800">
                        <Star className="fill-amber-400 text-amber-400" size={16} /> {dest.rating}
                      </div>
                      <span className="text-xs text-stone-400 font-medium">({dest.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                    <p className="text-stone-500 flex items-center gap-2 text-sm font-medium">
                      <MapPin size={16} className="text-brand-400" /> Kota Metropolitan
                    </p>
                    <p className="font-bold text-brand-600">{dest.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Banner - Rich Aesthetics */}
      <section className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto bg-stone-900 rounded-[3rem] lg:rounded-[4rem] overflow-hidden relative shadow-2xl shadow-brand-900/20"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

          <div className="absolute inset-0 opacity-50 mix-blend-overlay">
            <Image src="/images/hidden.png" alt="Hidden workshop" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-stone-900/40" />
          
          <div className="relative z-10 p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-white">
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-brand-300 font-bold text-sm tracking-widest uppercase mb-6">
                Eksklusif di Mongotrip
              </span>
              <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">Cari Sesuatu <br/>yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">Berbeda?</span></h2>
              <p className="text-stone-300 text-lg lg:text-xl mb-10 leading-relaxed font-medium">
                Jenuh dengan tempat wisata biasa? Mongotrip menyimpan direktori lengkap untuk tempat-tempat "Hidden Gems" seperti pabrik tua yang dijadikan kafe, bengkel klasik, dan spot unik lainnya.
              </p>
              <button className="px-10 py-5 bg-white text-stone-900 font-bold rounded-full hover:bg-brand-500 hover:text-white transition-all flex items-center gap-3 group shadow-xl">
                Eksplor Hidden Gems <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* Floating Image Decoration */}
            <div className="hidden lg:block relative w-80 h-96">
              <motion.div 
                animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-[2rem] overflow-hidden border-8 border-white/10 shadow-2xl rotate-3"
              >
                <Image src="/images/museum.png" alt="Museum" fill className="object-cover" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
