interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export default function AlertModal({ isOpen, onClose, title, message, type = 'info' }: AlertModalProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      default: return 'ℹ';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success': return 'from-tertiary to-secondary';
      case 'error': return 'from-quaternary to-quinary';
      case 'warning': return 'from-secondary to-tertiary';
      default: return 'from-tertiary to-quaternary';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform animate-scaleIn">
        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getColors()} flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg`}>
            {getIcon()}
          </div>
          <h3 className="text-2xl font-bold text-quinary mb-3">
            {title}
          </h3>
          <p className="text-quaternary mb-6">
            {message}
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-tertiary to-quaternary text-white px-8 py-3 rounded-full hover:shadow-xl transition-all transform hover:scale-105 font-semibold"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
