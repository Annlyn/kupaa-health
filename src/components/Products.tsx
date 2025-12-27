import { getAllProducts, type Product } from '../data/products';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import Toast from './Toast';
import ConfirmModal from './ConfirmModal';

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    fitness: '🏋️',
    movies: '🎥',
    business: '🍯'
  };
  return icons[category] || '📦';
};

export default function Products() {
  const { isAdmin } = useAuth();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: 'success' | 'error' }>({ isVisible: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleDelete = (id: number, name: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Product',
      message: `Are you sure you want to delete "${name}"?`,
      onConfirm: async () => {
        try {
          await api.deleteProduct(id);
          setProducts(products.filter(p => p.id !== id));
          setToast({ isVisible: true, message: 'Product deleted successfully!', type: 'success' });
        } catch (error) {
          console.error('Failed to delete product:', error);
          setToast({ isVisible: true, message: 'Failed to delete product', type: 'error' });
        }
      }
    });
  };

  return (
    <section className="bg-gradient-to-b from-white to-secondary py-16 px-6" id="products">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-quinary mb-4">
            Products
          </h2>
          <p className="text-quaternary text-lg max-w-2xl mx-auto">
            Combining passion with expertise to deliver value
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {products.map((product: Product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 relative group w-full max-w-xs animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {isAdmin && (
                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  className="absolute top-1 right-1 z-20 bg-quaternary/70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-quinary transition-all shadow-md opacity-0 group-hover:opacity-100 leading-none"
                  title="Delete product"
                >
                  ×
                </button>
              )}
              {hoveredId === product.id && (
                <>
                  <div className="bee bee-1">🐝</div>
                  <div className="bee bee-2">🐝</div>
                  <div className="bee bee-3">🐝</div>
                </>
              )}
              <div className="relative h-48 bg-gradient-to-br from-tertiary to-quaternary overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"
                />
                <div className="absolute top-4 right-4 bg-white text-4xl p-2 rounded-full shadow-lg">
                  {getCategoryIcon(product.category)}
                </div>
              </div>
              <div className="p-6 relative">
                <span className="text-xs font-bold text-tertiary uppercase bg-secondary px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <h3 className="text-xl font-bold text-quinary mt-3 mb-2 group-hover:text-tertiary transition-colors">
                  {product.name}
                </h3>
                <p className="text-quaternary mb-4 text-sm">{product.description}</p>
                <div className="flex items-center justify-between border-t border-secondary pt-4">
                  <span className="text-xl font-bold text-tertiary">
                    {product.price === 0 ? 'Free' : `Rs.${product.price}`}
                  </span>
                  <button className="bg-tertiary text-white px-4 py-1.5 rounded-full hover:bg-quaternary transition-all transform hover:scale-105 shadow-md text-sm">
                    {product.price === 0 ? 'Explore →' : 'Get Started →'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </section>
  );
}
