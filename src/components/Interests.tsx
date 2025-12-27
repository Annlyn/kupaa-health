import { getAllFitness, getAllMovies, type FitnessJourney, type MovieReview } from '../data/interests';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import Toast from './Toast';
import ConfirmModal from './ConfirmModal';

export default function Interests() {
  const { isAdmin } = useAuth();
  const [fitnessData, setFitnessData] = useState<FitnessJourney[]>([]);
  const [moviesData, setMoviesData] = useState<MovieReview[]>([]);
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: 'success' | 'error' }>({ isVisible: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fitness = await getAllFitness();
    const movies = await getAllMovies();
    setFitnessData(fitness);
    setMoviesData(movies);
  };

  const handleDeleteFitness = (id: number, milestone: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Milestone',
      message: `Are you sure you want to delete "${milestone}"?`,
      onConfirm: async () => {
        try {
          await api.deleteFitness(id);
          setFitnessData(fitnessData.filter(f => f.id !== id));
          setToast({ isVisible: true, message: 'Fitness milestone deleted successfully!', type: 'success' });
        } catch (error) {
          console.error('Failed to delete fitness milestone:', error);
          setToast({ isVisible: true, message: 'Failed to delete fitness milestone', type: 'error' });
        }
      }
    });
  };

  const handleDeleteMovie = (id: number, title: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Movie',
      message: `Are you sure you want to delete "${title}"?`,
      onConfirm: async () => {
        try {
          await api.deleteMovie(id);
          setMoviesData(moviesData.filter(m => m.id !== id));
          setToast({ isVisible: true, message: 'Movie deleted successfully!', type: 'success' });
        } catch (error) {
          console.error('Failed to delete movie:', error);
          setToast({ isVisible: true, message: 'Failed to delete movie', type: 'error' });
        }
      }
    });
  };

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white via-primary to-white" id="interests">
      <div className="max-w-6xl mx-auto">
        {/* Fitness Journey Section */}
        <div className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">💪</div>
            <h2 className="text-3xl font-bold text-quinary flex-1">
              Fitness Journey
            </h2>
            <div className="hidden md:block h-1 w-32 bg-gradient-to-r from-tertiary to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {fitnessData.map((item: FitnessJourney, index) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-lg border-l-4 border-tertiary hover:shadow-xl transition-all transform hover:-translate-y-1 relative overflow-hidden group w-full max-w-xs"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteFitness(item.id, item.milestone)}
                    className="absolute top-1 right-1 z-20 bg-quaternary/70 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-quinary transition-all shadow-md opacity-0 group-hover:opacity-100 leading-none"
                    title="Delete milestone"
                  >
                    ×
                  </button>
                )}
                <div className="absolute top-0 right-0 w-20 h-20 bg-secondary opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
                <div className="text-2xl font-bold text-tertiary mb-2 flex items-center gap-2">
                  <span className="text-3xl">📅</span>
                  {item.year}
                </div>
                <h3 className="text-lg font-bold text-quinary mb-3 relative z-10">
                  {item.milestone}
                </h3>
                <p className="text-sm text-quaternary relative z-10">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Movie Reviews Section */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">🎬</div>
            <h2 className="text-3xl font-bold text-quinary flex-1">
              Favorite Movies
            </h2>
            <div className="hidden md:block h-1 w-32 bg-gradient-to-r from-tertiary to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
            {moviesData.map((movie: MovieReview, index) => (
              <div
                key={movie.id}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-secondary relative overflow-hidden group w-full max-w-2xl"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteMovie(movie.id, movie.title)}
                    className="absolute top-1 right-1 z-20 bg-quaternary/70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-quinary transition-all shadow-md opacity-0 group-hover:opacity-100 leading-none"
                    title="Delete movie"
                  >
                    ×
                  </button>
                )}
                <div className="absolute top-0 right-0 text-8xl opacity-5 group-hover:opacity-10 transition-opacity">🎥</div>
                <div className="flex items-start gap-4 relative z-10">
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-28 h-40 object-cover rounded-lg shadow-lg border-2 border-tertiary"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-tertiary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                      {movie.rating}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-quinary mb-1 group-hover:text-tertiary transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-tertiary font-semibold bg-secondary/30 px-2 py-1 rounded">{movie.year}</span>
                      <div className="flex text-tertiary text-lg">
                        {[...Array(movie.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-secondary/20 to-transparent p-3 rounded">
                      <p className="text-sm text-quaternary line-clamp-3 italic">
                        "{movie.vision}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
