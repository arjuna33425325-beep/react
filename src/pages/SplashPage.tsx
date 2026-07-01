import { useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/background.png';
import polinesLogo from '../assets/polines-warna.png';
import polinesText from '../assets/polines-text.png';
import { Icon } from '@iconify/react';

export default function SplashPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Login Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl mx-6 p-8 w-full max-w-sm">
        {/* Logos row */}
        <div className="flex items-center justify-between mb-6">
          <img src={polinesLogo} alt="Polines Logo" className="w-14 h-14 object-contain" />

          {/* Polines text logo */}
          <div className="flex flex-col items-center">
            {/* <span
              className="text-3xl font-black italic tracking-tight"
              style={{ fontFamily: 'Georgia, serif', color: '#0057a8' }}
            >
              polines
            </span> */}
            <img src={polinesText} alt="Polines Logo" className="w-40 object-contain" />
            {/* <span className="text-[8px] text-gray-500 tracking-wide">politeknik negeri semarang</span>
            <span className="text-[8px] text-gray-500 italic">committed to quality</span> */}
          </div>

          {/* BLU badge */}
          <div className="w-14 h-14 rounded-full bg-[#00b4b4] flex items-center justify-center shadow">
            <span className="text-white font-black text-xl leading-none">BLU</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black text-center text-gray-900 mb-2">SSO POLINES</h1>
        <p className="text-center text-gray-600 text-sm mb-8">
          Masuk Untuk melanjutkan ke layanan SSO POLINES
        </p>

        {/* Login Button */}
        <button
          className="w-full bg-[#1e58b3] flex justify-center items-center gap-3 hover:bg-blue-800 active:scale-95 transition-all text-white font-bold py-4 rounded-xl text-base shadow-lg"
          onClick={() => navigate('/portal')}
        >
          <Icon icon="mingcute:google-fill" />
          <span className='text-center'>Masuk dengan email POLINES</span>
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          2026 Politeknik Negeri Semarang
        </p>
      </div>
    </div>
  );
}
