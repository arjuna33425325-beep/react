import { Icon } from '@iconify/react';

type AlertModalProps = {
  isOpen: boolean;
  type: 'success' | 'error';
  title: string;
  description?: string;
  onContinue: () => void;
};

export default function AlertModal({ isOpen, type, title, description, onContinue }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 flex flex-col items-center text-center shadow-xl animate-fade-in-up">
        {/* Icon Header */}
        <div className="mb-6 relative">
          <div className="w-16 h-4 absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 bg-gray-200 rounded-full mb-8"></div>
          {type === 'success' ? (
            <div className="w-24 h-24 bg-[#1e58b3] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Icon icon="solar:check-read-bold" width={48} className="text-white" />
            </div>
          ) : (
            <div className="w-24 h-24 bg-[#99221a] rounded-full flex items-center justify-center shadow-lg shadow-red-500/20">
              <Icon icon="solar:check-read-bold" width={48} className="text-white" />
            </div>
          )}
        </div>

        {/* Text */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight whitespace-pre-line">{title}</h3>
        {description && <p className="text-sm text-gray-600 mb-8">{description}</p>}

        {/* Button */}
        <button 
          className={`w-full py-4 rounded-full font-bold text-white text-lg transition-transform active:scale-95 ${
            type === 'success' 
              ? 'bg-[#1e58b3] hover:bg-blue-800' 
              : 'bg-gradient-to-b from-[#99221a] to-[#c72d24] hover:brightness-110'
          }`}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
