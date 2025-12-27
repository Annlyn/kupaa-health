import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLogin({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      onClose();
      window.location.reload();
    } else {
      setError('Invalid credentials. Try admin/admin123');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-quinary">Admin Login</h2>
          <button
            onClick={onClose}
            className="text-quaternary hover:text-quinary text-3xl font-bold"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-quaternary font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
              placeholder="admin"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-quaternary font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
              placeholder="admin123"
              required
            />
          </div>
          {error && (
            <div className="mb-4 p-3 bg-quaternary/10 text-quaternary rounded-lg text-sm border border-quaternary/30">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-tertiary text-white py-3 rounded-lg hover:bg-quaternary transition-colors font-semibold shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
