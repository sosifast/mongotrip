import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-brand-500 p-2 rounded-xl text-white">
              <Compass size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-stone-900">Mongotrip</span>
          </div>
          <p className="text-stone-500">Platform pencarian destinasi terlengkap untuk perjalanan dan petualangan kota kamu.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-stone-900 mb-6">Perusahaan</h4>
          <ul className="space-y-4 text-stone-500">
            <li><a href="#" className="hover:text-brand-500">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-brand-500">Karir</a></li>
            <li><a href="#" className="hover:text-brand-500">Blog</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-stone-900 mb-6">Bantuan</h4>
          <ul className="space-y-4 text-stone-500">
            <li><a href="#" className="hover:text-brand-500">Pusat Bantuan</a></li>
            <li><a href="#" className="hover:text-brand-500">Kontak</a></li>
            <li><a href="#" className="hover:text-brand-500">Kebijakan Privasi</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-stone-900 mb-6">Ikuti Kami</h4>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-brand-50 hover:text-brand-600 cursor-pointer transition-colors">FB</div>
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-brand-50 hover:text-brand-600 cursor-pointer transition-colors">IG</div>
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-brand-50 hover:text-brand-600 cursor-pointer transition-colors">TW</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-stone-100 text-center text-stone-500 text-sm">
        © 2026 Mongotrip. All rights reserved.
      </div>
    </footer>
  );
}
