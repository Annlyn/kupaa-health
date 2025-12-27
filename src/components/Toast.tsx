import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600';
  const icon = type === 'success' ? '✓' : '✕';

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideInRight">
      <div className={`bg-gradient-to-r ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px]`}>
        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center font-bold text-lg">
          {icon}
        </div>
        <p className="font-semibold flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-white hover:text-white/80 text-xl font-bold leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
