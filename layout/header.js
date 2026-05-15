"use client";

import { useState, useEffect } from "react";
import { Compass, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Only apply transparency on the Home page (/)
    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine header style
    const headerStyle = (isHomePage && !isScrolled) 
        ? "bg-transparent border-transparent py-6" 
        : "bg-white/80 backdrop-blur-md border-b border-stone-200/50 py-4 shadow-sm";

    const textStyle = (isHomePage && !isScrolled) 
        ? "text-white" 
        : "text-stone-600";

    const logoTextStyle = (isHomePage && !isScrolled) 
        ? "text-white" 
        : "text-stone-900";

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${headerStyle}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className={`p-2 rounded-xl text-white transition-all duration-300 ${isHomePage && !isScrolled ? 'bg-white/20 backdrop-blur-md group-hover:bg-brand-500' : 'bg-brand-500'}`}>
                        <Compass size={24} />
                    </div>
                    <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${logoTextStyle}`}>
                        Mongotrip
                    </span>
                </Link>

                <nav className={`hidden md:flex gap-8 text-sm font-bold transition-colors duration-300 ${textStyle}`}>
                    <Link href="/" className="hover:text-brand-500 transition-colors">Destinasi</Link>
                    <Link href="/explorer" className="hover:text-brand-500 transition-colors">Jelajahi</Link>
                    <Link href="/" className="hover:text-brand-500 transition-colors">Tentang Kami</Link>
                    <Link href="/" className="hover:text-brand-500 transition-colors">Kontak</Link>
                </nav>

                <div className="hidden md:flex gap-4">
                    <button className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${isHomePage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-stone-700 hover:bg-stone-100'}`}>
                        Masuk
                    </button>
                    <button className="px-6 py-2.5 text-sm font-bold bg-brand-500 text-white rounded-full hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30">
                        Daftar
                    </button>
                </div>

                <button className={`md:hidden p-2 transition-colors duration-300 ${textStyle}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4 text-stone-600 font-bold">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>Destinasi</Link>
                            <Link href="/explorer" onClick={() => setIsMenuOpen(false)}>Jelajahi</Link>
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>Tentang Kami</Link>
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>Kontak</Link>
                            <hr className="border-stone-100" />
                            <div className="flex flex-col gap-3">
                                <button className="w-full py-3 text-stone-700 font-bold">Masuk</button>
                                <button className="w-full py-3 bg-brand-500 text-white rounded-xl font-bold">Daftar</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

// Need to import AnimatePresence and motion for the mobile menu
import { motion, AnimatePresence } from "framer-motion";
