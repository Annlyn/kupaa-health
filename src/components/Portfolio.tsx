import { portfolioData, type Review } from '../data/portfolio';
import { api } from '../lib/api';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Toast from './Toast';
import ConfirmModal from './ConfirmModal';

export default function Portfolio() {
  const { isAdmin } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: 'success' | 'error' }>({ isVisible: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  const [formData, setFormData] = useState({
    name: '',
    product: '',
    rating: 5,
    review: ''
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await api.getReviews();
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
      setReviews(portfolioData);
    }
  };

  const handleDelete = (id: number, name: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Review',
      message: `Are you sure you want to delete the review from "${name}"?`,
      onConfirm: async () => {
        try {
          await api.deleteReview(id);
          setReviews(reviews.filter(r => r.id !== id));
          setToast({ isVisible: true, message: 'Review deleted successfully!', type: 'success' });
        } catch (error) {
          console.error('Failed to delete review:', error);
          setToast({ isVisible: true, message: 'Failed to delete review', type: 'error' });
        }
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createReview(formData);
      alert('Review submitted successfully! Refreshing page...');
      window.location.reload();
    } catch (error) {
      alert('Failed to submit review. Make sure the backend is running.');
      console.error(error);
    }
  };

  return (
    <section className="bg-gradient-to-b from-secondary to-white py-12 px-6" id="portfolio">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-quinary mb-4">
            Customer Reviews
          </h2>
          <p className="text-quaternary text-lg max-w-2xl mx-auto mb-6">
            What our happy customers have to say
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-tertiary text-white px-6 py-3 rounded-full hover:bg-quaternary transition-all transform hover:scale-105 shadow-lg font-semibold"
          >
            ✍️ Add Your Review
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {reviews.map((review: Review, index) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 relative overflow-hidden group w-full max-w-sm animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {isAdmin && (
                <button
                  onClick={() => handleDelete(review.id, review.name)}
                  className="absolute top-2 right-2 z-20 bg-quaternary/70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-quinary transition-all shadow-md opacity-0 group-hover:opacity-100 leading-none"
                  title="Delete review"
                >
                  ×
                </button>
              )}
              <div className="absolute top-0 right-0 text-9xl opacity-5 group-hover:opacity-10 transition-opacity">💬</div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-tertiary to-quaternary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-quinary">
                      {review.name}
                    </h3>
                    <div className="flex text-tertiary text-sm">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-secondary/20 to-transparent p-4 rounded-lg mb-4">
                  <p className="text-quaternary italic">"{review.review}"</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-tertiary font-semibold bg-secondary/30 px-3 py-1 rounded-full">
                    {review.product}
                  </span>
                  <span className="text-quaternary">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold text-quinary">Share Your Review</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-quaternary hover:text-quinary text-3xl font-bold transition-colors"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-quaternary font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-quaternary font-semibold mb-2">Product</label>
                <select
                  required
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none transition-colors"
                >
                  <option value="">Select a product</option>
                  <option value="Pure Organic Honey">Pure Organic Honey</option>
                  <option value="Raw Wildflower Honey">Raw Wildflower Honey</option>
                  <option value="Natural Peanut Butter">Natural Peanut Butter</option>
                  <option value="Almond Butter">Almond Butter</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-quaternary font-semibold mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className="text-3xl transition-all transform hover:scale-110"
                    >
                      <span className={star <= formData.rating ? 'text-tertiary' : 'text-secondary/50'}>
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-quaternary font-semibold mb-2">Your Review</label>
                <textarea
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none transition-colors h-32 resize-none"
                  placeholder="Share your experience with our product..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-secondary text-quaternary rounded-lg hover:bg-secondary transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-tertiary text-white rounded-lg hover:bg-quaternary transition-colors font-semibold shadow-lg"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
