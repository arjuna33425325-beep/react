import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

type ProfilePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfilePopup({ isOpen, onClose }: ProfilePopupProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose}></div>
      <div className="absolute top-16 right-4 z-50 bg-white rounded-2xl shadow-xl w-64 p-5 animate-fade-in">
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 text-lg">IKFINA ARZAQI NAFI'AH</h3>
          <p className="text-gray-500 text-sm">Mahasiswa</p>
        </div>
        
        <div className="h-px bg-gray-200 mb-4 w-full"></div>

        <button 
          className="flex items-center gap-3 w-full py-2 mb-2 text-gray-700 hover:text-blue-700 transition-colors font-medium text-left"
          onClick={() => {
            onClose();
            navigate('/profile');
          }}
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <Icon icon="solar:user-bold" width={20} className="text-gray-400" />
          </div>
          Profil Saya
        </button>

        <button 
          className="flex items-center gap-3 w-full py-2 text-red-600 hover:text-red-700 transition-colors font-medium text-left"
          onClick={() => {
            onClose();
            navigate('/');
          }}
        >
          <Icon icon="solar:logout-2-outline" width={24} />
          Keluar
        </button>
      </div>
    </>
  );
}
