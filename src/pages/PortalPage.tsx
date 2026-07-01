import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Header from '../components/Header';

const categories = ['All', 'Akademik', 'Laporan', 'Administrasi', 'Kemahasiswaan'];

export default function PortalPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Laporan');

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col pb-6">
      <Header />

      <div className="px-4 mt-4">
        {/* Welcome Card */}
        <div className="bg-white rounded-3xl p-5 shadow-xl">
          <h1 className="text-xl font-bold uppercase leading-tight">
            Selamat Datang{' '}
            <span className="text-[#1e58b3]">Ikfina Arzaqi Nafi'ah</span>
          </h1>
          <p className="text-sm text-gray-600 mt-2 mb-5">
            Gerbang akses terintegrasi untuk seluruh layanan digital Politeknik Negeri Semarang
          </p>

          {/* Detail Pengguna Button */}
          <button
            className="w-full bg-[#1e58b3] text-white rounded-xl py-4 px-5 flex items-center gap-4 mb-4"
            onClick={() => navigate('/profile')}
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Icon icon="solar:user-bold" width={22} className="text-white" />
            </div>
            <span className="font-semibold text-base">Detail Pengguna</span>
          </button>

          {/* Search Bar */}
          <div className="relative mb-5">
            <Icon
              icon="solar:magnifer-linear"
              width={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Cari aplikasi disini"
              className="w-full bg-gray-100 border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500 text-sm"
              onFocus={() => navigate('/search')}
              readOnly
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#1e58b3] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* App Grid */}
          <div className="flex gap-4">
            <div
              className="bg-[#e8e8e8] rounded-xl p-4 w-36 flex flex-col items-center cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => navigate('/home')}
            >
              <div className="bg-[#1e58b3] w-16 h-16 rounded-xl flex items-center justify-center mb-3 shadow">
                <Icon icon="solar:document-text-bold" width={32} color="white" />
              </div>
              <p className="font-bold uppercase tracking-wider text-xs mb-1 text-center">LAPORAN</p>
              <p className="text-[10px] text-gray-500 mb-2 text-center">Laporan ke...</p>
              <div className="w-full h-px bg-gray-400 mb-2"></div>
              <p className="text-[10px] text-gray-600 font-medium">Masuk layanan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
