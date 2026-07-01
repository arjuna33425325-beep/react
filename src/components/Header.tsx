import { useState } from 'react';
import { Icon } from '@iconify/react';
import polinesLogo from '../assets/polines.png';
import ProfilePopup from './ProfilePopup';

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="relative">
      {/* Blue gradient header - top to bottom */}
      <div
        className="text-white px-5 py-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(to bottom, #1565C0, #1e88e5)',
          minHeight: '72px',
        }}
      >
        {/* Left: small logo */}
        <div className="flex items-center">
          <div className="w-11 h-11 rounded-full border border-white/30 bg-white/10 flex items-center justify-center p-1">
            <img src={polinesLogo} alt="Polines" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Right: profile avatar + chevron */}
        <div
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={() => setIsPopupOpen(true)}
        >
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-white/30 object-cover shadow"
          />
          <Icon icon="solar:alt-arrow-down-linear" width={18} className="text-white" />
        </div>
      </div>

      <ProfilePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
