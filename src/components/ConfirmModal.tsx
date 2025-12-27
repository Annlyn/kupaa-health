interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform animate-scaleIn">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-tertiary flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
            ⚠
          </div>
          <h3 className="text-2xl font-bold text-quinary mb-3">
            {title}
          </h3>
          <p className="text-quaternary mb-6">
            {message}
          </p>
          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 bg-secondary/30 text-quinary px-6 py-3 rounded-full hover:bg-secondary/50 transition-all font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 bg-gradient-to-r from-quaternary to-quinary text-white px-6 py-3 rounded-full hover:shadow-xl transition-all transform hover:scale-105 font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
