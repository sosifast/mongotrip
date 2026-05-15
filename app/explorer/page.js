"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { 
  Search, MapPin, Star, Filter, ChevronDown, 
  Heart, Clock, Compass, X, ArrowRight, Building2, Layers,
  Camera, Bed, Landmark, Sparkles
} from "lucide-react";
import Header from "../../layout/header";
import SAMPLE_DATA from "../sample/explorer.json";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Map categories to icons and colors
const CATEGORY_STYLES = {
  "Wisata": { icon: Camera, color: "bg-brand-500", text: "text-brand-500" },
  "Hotel": { icon: Building2, color: "bg-sky-500", text: "text-sky-500" },
  "Museum": { icon: Landmark, color: "bg-indigo-500", text: "text-indigo-500" },
  "Hidden Gems": { icon: Sparkles, color: "bg-amber-500", text: "text-amber-500" }
};

const INITIAL_DATA = SAMPLE_DATA.map((item, index) => {
  const [lat, lng] = item.koordinat.split(',').map(Number);
  const titles = ["Simpang Lima Semarang", "Pusat Kota Semarang", "River Walk Boja"];
  
  // Deterministic "random" values to avoid hydration mismatch
  const rating = (4.7 + (index % 3) * 0.1).toFixed(1);
  const reviews = (index % 5 + 1) + "k";
  const price = item.kategori === "Hotel" ? "Rp 450.000" : (item.id === 1 ? "Gratis" : "Rp 25.000");

  return {
    id: index + 1,
    title: titles[index] || `${item.kategori} ${item.kota}`,
    category: item.kategori,
    province: item.provinsi,
    city: item.kota,
    image: item.image,
    rating,
    reviews,
    price,
    location: `${item.kota}, ${item.provinsi}`,
    time: "Buka • 08:00 - 22:00",
    tags: [item.kategori, "Terpopuler"],
    desc: item.alamat_lengkap,
    lat,
    lng
  };
});

const CustomSelect = ({ label, icon: Icon, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => { if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex-1 relative" ref={containerRef}>
      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1.5 ml-1">{label}</p>
      <button onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between bg-stone-100/50 p-4 rounded-2xl border transition-all ${isOpen ? 'border-brand-500 bg-white ring-4 ring-brand-500/10' : 'border-stone-200/50 hover:bg-stone-100'}`}>
        <div className="flex items-center gap-3 truncate"><Icon size={18} className={value ? "text-brand-500" : "text-stone-400"} /><span className={`text-sm font-bold truncate ${value ? "text-stone-900" : "text-stone-400"}`}>{value || placeholder}</span></div>
        <ChevronDown size={16} className={`text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>{isOpen && (
        <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden">
          <div className="max-h-60 overflow-y-auto p-2">
            <div onClick={() => { onChange(""); setIsOpen(false); }} className="p-3 rounded-xl hover:bg-stone-50 cursor-pointer text-sm font-bold text-stone-400 transition-colors">Semua {label}</div>
            {options.map(opt => (<div key={opt} onClick={() => { onChange(opt); setIsOpen(false); }} className={`p-3 rounded-xl cursor-pointer text-sm font-bold transition-all ${value === opt ? 'bg-brand-50 text-brand-600' : 'hover:bg-stone-50 text-stone-700'}`}>{opt}</div>))}
          </div>
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
};

export default function Explorer() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [filters, setFilters] = useState({ category: "", province: "", city: "" });
  const [viewState, setViewState] = useState({ latitude: -6.9893, longitude: 110.4151, zoom: 12 });
  const mapRef = useRef();
  const filterOptions = useMemo(() => ({ categories: [...new Set(INITIAL_DATA.map(i => i.category))], provinces: [...new Set(INITIAL_DATA.map(i => i.province))], cities: [...new Set(INITIAL_DATA.map(i => i.city))] }), []);
  const filteredData = useMemo(() => INITIAL_DATA.filter(item => (!filters.category || item.category === filters.category) && (!filters.province || item.province === filters.province) && (!filters.city || item.city === filters.city)), [filters]);

  useEffect(() => {
    if (hoveredId && mapRef.current) {
      const place = INITIAL_DATA.find(p => p.id === hoveredId);
      if (place) mapRef.current.flyTo({ center: [place.lng, place.lat], duration: 1200, zoom: 15 });
    }
  }, [hoveredId]);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden font-sans bg-stone-900 text-white">
      <Header />
      <main className="relative flex-1 w-full h-full">
        <div className="absolute inset-0 z-0">
          <Map ref={mapRef} {...viewState} onMove={evt => setViewState(evt.viewState)} style={{ width: '100%', height: '100%' }} mapStyle="mapbox://styles/mapbox/light-v11" mapboxAccessToken={MAPBOX_TOKEN}>
            {filteredData.map((item) => {
              const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES["Wisata"];
              const CategoryIcon = style.icon;
              const isActive = hoveredId === item.id || selectedPlace?.id === item.id;
              return (
                <Marker key={`marker-${item.id}`} latitude={item.lat} longitude={item.lng} anchor="bottom">
                  <div onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)} onClick={() => setSelectedPlace(item)} className="relative cursor-pointer group">
                    <motion.div animate={{ scale: isActive ? 1.2 : 1, y: isActive ? -5 : 0 }} className="flex flex-col items-center">
                      {/* Tooltip removed as per request */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-2xl border-2 transition-all duration-300 ${isActive ? `${style.color} border-white` : 'bg-white border-stone-200'}`}>
                        <CategoryIcon size={18} className={isActive ? "text-white" : style.text} />
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isActive ? style.color : 'bg-stone-300'}`} />
                    </motion.div>
                  </div>
                </Marker>
              );
            })}
            <div className="absolute top-24 right-6"><NavigationControl /></div>
          </Map>
        </div>

        <div className="absolute top-24 left-6 bottom-6 w-full max-w-[440px] z-20 flex flex-col pointer-events-none">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/40 flex flex-col h-full pointer-events-auto overflow-hidden">
            <div className="p-8 pb-6 border-b border-stone-200/50">
              <h1 className="text-3xl font-black text-stone-900 mb-6 tracking-tighter">Jelajahi <span className="text-brand-500">Trip</span></h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <CustomSelect label="Kategori" icon={Compass} options={filterOptions.categories} value={filters.category} onChange={(val) => setFilters(prev => ({...prev, category: val}))} placeholder="Kategori" />
                  <CustomSelect label="Provinsi" icon={Layers} options={filterOptions.provinces} value={filters.province} onChange={(val) => setFilters(prev => ({...prev, province: val}))} placeholder="Provinsi" />
                  <CustomSelect label="Kota" icon={MapPin} options={filterOptions.cities} value={filters.city} onChange={(val) => setFilters(prev => ({...prev, city: val}))} placeholder="Kota" />
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scrollbar-hide">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-2">Hasil Temuan ({filteredData.length})</p>
              {filteredData.map((item) => (
                <motion.div key={item.id} onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)} onClick={() => { setSelectedPlace(item); mapRef.current?.flyTo({ center: [item.lng, item.lat], zoom: 15.5, duration: 1500 }); }} className={`relative cursor-pointer rounded-[2rem] overflow-hidden bg-white border-2 transition-all duration-300 ${selectedPlace?.id === item.id ? 'border-brand-500 shadow-xl' : 'border-transparent shadow-md hover:shadow-lg'}`}>
                  <div className="h-40 relative">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <h3 className="text-lg font-bold text-white leading-tight pr-2">{item.title}</h3>
                      <div className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1 text-stone-900">
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-black">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredData.length === 0 && <div className="py-12 text-center"><p className="text-stone-400 font-bold">Tidak ada destinasi yang cocok.</p></div>}
            </div>
          </div>
        </div>

        <AnimatePresence>{selectedPlace && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute inset-y-0 right-0 w-full max-w-[500px] z-50 bg-white shadow-2xl flex flex-col pointer-events-auto">
            <div className="relative h-[40vh]"><Image src={selectedPlace.image} alt="" fill className="object-cover" /><button onClick={() => setSelectedPlace(null)} className="absolute top-6 left-6 w-12 h-12 bg-black/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/40 shadow-xl"><X size={24} /></button>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white/80 to-transparent"><h2 className="text-4xl font-black text-stone-900 tracking-tighter leading-none mb-2">{selectedPlace.title}</h2><div className="text-stone-500 font-bold">{selectedPlace.location}</div></div>
            </div>
            <div className="flex-1 overflow-y-auto p-8"><h4 className="text-stone-900 font-black text-lg mb-2">Informasi</h4><p className="text-stone-600 leading-relaxed font-medium mb-8">{selectedPlace.desc}</p><button className="w-full h-16 bg-brand-500 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 transition-all">Pesan Sekarang <ArrowRight size={20} /></button></div>
          </motion.div>
        )}</AnimatePresence>
      </main>
    </div>
  );
}
