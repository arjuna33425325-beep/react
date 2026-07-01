import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function BackButton({ onClick, className = '' }: { onClick?: () => void, className?: string }) {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onClick) onClick();
    else navigate(-1);
  };

  return (
    <button 
      onClick={handleBack}
      className={`flex items-center gap-1 text-gray-500 font-medium text-sm mb-4 hover:text-gray-700 transition-colors ${className}`}
    >
      <Icon icon="solar:alt-arrow-left-linear" width={20} />
      Kembali
    </button>
  );
}
