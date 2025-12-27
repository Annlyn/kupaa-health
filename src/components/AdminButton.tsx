import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminButton() {
  const { isAdmin } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      <button
        onClick={() => isAdmin ? setShowDashboard(true) : setShowLogin(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-tertiary to-quaternary text-white w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center justify-center text-2xl"
        title={isAdmin ? 'Admin Dashboard' : 'Admin Login'}
      >
        {isAdmin ? '🛠️' : '🔐'}
      </button>

      {showLogin && <AdminLogin onClose={() => setShowLogin(false)} />}
      {showDashboard && <AdminDashboard onClose={() => setShowDashboard(false)} />}
    </>
  );
}
