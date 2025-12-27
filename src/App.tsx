import Hero from './components/Hero';
import Interests from './components/Interests';
import Products from './components/Products';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import AdminButton from './components/AdminButton';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <main>
          <Hero />
          <Products />
          <Portfolio />
          <Interests />
        </main>
        <Footer />
        <AdminButton />
      </div>
    </AuthProvider>
  );
}

export default App;
