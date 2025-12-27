import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import { type Product } from '../data/products';
import { type FitnessJourney, type MovieReview } from '../data/interests';
import { type Review } from '../data/portfolio';

type TabType = 'products' | 'reviews' | 'movies' | 'fitness';

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('products');
  
  // Data lists
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [movies, setMovies] = useState<MovieReview[]>([]);
  const [fitness, setFitness] = useState<FitnessJourney[]>([]);
  
  // Product form
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '', price: 0, description: '', category: 'business', image: ''
  });
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string>('');

  // Movie form
  const [movieForm, setMovieForm] = useState<Partial<MovieReview>>({
    title: '', year: '2025', rating: 5, poster: '', vision: ''
  });
  const [movieImageFile, setMovieImageFile] = useState<File | null>(null);
  const [movieImagePreview, setMovieImagePreview] = useState<string>('');

  // Fitness form
  const [fitnessForm, setFitnessForm] = useState<Partial<FitnessJourney>>({
    year: '2025', milestone: '', description: '', image: ''
  });
  const [fitnessImageFile, setFitnessImageFile] = useState<File | null>(null);
  const [fitnessImagePreview, setFitnessImagePreview] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, reviewsData, moviesData, fitnessData] = await Promise.all([
        api.getProducts(),
        api.getReviews(),
        api.getMovies(),
        api.getFitness()
      ]);
      setProducts(productsData);
      setReviews(reviewsData);
      setMovies(moviesData);
      setFitness(fitnessData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
        alert('Product deleted successfully!');
      } catch (error) {
        alert('Failed to delete product.');
        console.error(error);
      }
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        await api.deleteReview(id);
        setReviews(reviews.filter(r => r.id !== id));
        alert('Review deleted successfully!');
      } catch (error) {
        alert('Failed to delete review.');
        console.error(error);
      }
    }
  };

  const handleDeleteMovie = async (id: number) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      try {
        await api.deleteMovie(id);
        setMovies(movies.filter(m => m.id !== id));
        alert('Movie deleted successfully!');
      } catch (error) {
        alert('Failed to delete movie.');
        console.error(error);
      }
    }
  };

  const handleDeleteFitness = async (id: number) => {
    if (confirm('Are you sure you want to delete this fitness milestone?')) {
      try {
        await api.deleteFitness(id);
        setFitness(fitness.filter(f => f.id !== id));
        alert('Fitness milestone deleted successfully!');
      } catch (error) {
        alert('Failed to delete fitness milestone.');
        console.error(error);
      }
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = productForm.image || '';
      
      // Upload image if file is selected
      if (productImageFile) {
        const uploadResult = await api.uploadImage(productImageFile);
        imageUrl = uploadResult.url;
      }
      
      if (!imageUrl) {
        alert('Please select an image');
        return;
      }
      
      const newProduct = await api.createProduct({
        name: productForm.name!,
        price: productForm.price!,
        description: productForm.description!,
        category: productForm.category!,
        image: imageUrl
      });
      
      setProducts([...products, newProduct]);
      setProductForm({ name: '', price: 0, description: '', category: 'business', image: '' });
      setProductImageFile(null);
      setProductImagePreview('');
      alert('Product added successfully!');
    } catch (error) {
      alert('Failed to add product. Make sure the backend is running.');
      console.error(error);
    }
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = movieForm.poster || '';
      
      // Upload image if file is selected
      if (movieImageFile) {
        const uploadResult = await api.uploadImage(movieImageFile);
        imageUrl = uploadResult.url;
      }
      
      if (!imageUrl) {
        alert('Please select an image');
        return;
      }
      
      const newMovie = await api.createMovie({
        title: movieForm.title!,
        year: movieForm.year!,
        rating: movieForm.rating!,
        poster: imageUrl,
        vision: movieForm.vision!
      });
      
      setMovies([...movies, newMovie]);
      setMovieForm({ title: '', year: '2025', rating: 5, poster: '', vision: '' });
      setMovieImageFile(null);
      setMovieImagePreview('');
      alert('Movie added successfully!');
    } catch (error) {
      alert('Failed to add movie. Make sure the backend is running.');
      console.error(error);
    }
  };

  const handleAddFitness = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = fitnessForm.image || '';
      
      // Upload image if file is selected
      if (fitnessImageFile) {
        const uploadResult = await api.uploadImage(fitnessImageFile);
        imageUrl = uploadResult.url;
      }
      
      if (!imageUrl) {
        alert('Please select an image');
        return;
      }
      
      const newFitness = await api.createFitness({
        year: fitnessForm.year!,
        milestone: fitnessForm.milestone!,
        description: fitnessForm.description!,
        image: imageUrl
      });
      
      setFitness([...fitness, newFitness]);
      setFitnessForm({ year: '2025', milestone: '', description: '', image: '' });
      setFitnessImageFile(null);
      setFitnessImagePreview('');
      alert('Fitness milestone added successfully!');
    } catch (error) {
      alert('Failed to add fitness milestone. Make sure the backend is running.');
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-tertiary to-quaternary text-white p-6 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-3xl font-bold">🛠️ Admin Dashboard</h2>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors font-semibold"
            >
              Logout
            </button>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 w-10 h-10 rounded-lg text-2xl font-bold transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-secondary">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-4 font-semibold transition-colors ${
              activeTab === 'products' ? 'bg-tertiary text-white' : 'bg-secondary text-quaternary hover:bg-secondary/70'
            }`}
          >
            🍯 Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-4 font-semibold transition-colors ${
              activeTab === 'reviews' ? 'bg-tertiary text-white' : 'bg-secondary text-quaternary hover:bg-secondary/70'
            }`}
          >
            💬 Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('movies')}
            className={`flex-1 py-4 font-semibold transition-colors ${
              activeTab === 'movies' ? 'bg-tertiary text-white' : 'bg-secondary text-quaternary hover:bg-secondary/70'
            }`}
          >
            🎬 Movies ({movies.length})
          </button>
          <button
            onClick={() => setActiveTab('fitness')}
            className={`flex-1 py-4 font-semibold transition-colors ${
              activeTab === 'fitness' ? 'bg-tertiary text-white' : 'bg-secondary text-quaternary hover:bg-secondary/70'
            }`}
          >
            💪 Fitness ({fitness.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <h3 className="text-2xl font-bold text-quinary mb-4">Manage Products</h3>
              
              {/* Existing Products */}
              {products.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-quaternary mb-3">Current Products</h4>
                  <div className="space-y-2">
                    {products.map(product => (
                      <div key={product.id} className="flex items-center justify-between bg-secondary/30 p-3 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-quinary">{product.name}</p>
                          <p className="text-sm text-quaternary">${product.price} - {product.description.substring(0, 60)}...</p>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="ml-3 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                          title="Delete product"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add New Product Form */}
              <form onSubmit={handleAddProduct} className="space-y-4 border-t border-secondary pt-4">
                <h4 className="font-semibold text-quaternary">Add New Product</h4>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
                    placeholder="e.g., Raw Honey"
                  />
                </div>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Price ($)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Description</label>
                  <textarea
                    required
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none h-24"
                    placeholder="Describe the product..."
                  />
                </div>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Product Image</label>
                  {productImagePreview && (
                    <div className="relative mb-4">
                      <img src={productImagePreview} alt="Preview" className="w-48 h-48 object-cover rounded-lg border-2 border-secondary" />
                      <button
                        type="button"
                        onClick={() => {
                          setProductImageFile(null);
                          setProductImagePreview('');
                          setProductForm({...productForm, image: ''});
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProductImageFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProductImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
                  />
                  <p className="text-sm text-gray-600 mt-1">Upload image (Max 5MB, JPG/PNG/GIF/WebP)</p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-tertiary text-white py-3 rounded-lg hover:bg-quaternary transition-colors font-semibold shadow-lg"
                >
                  Add Product
                </button>
              </form>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-2xl font-bold text-quinary mb-4">Manage Customer Reviews</h3>
              
              {reviews.length > 0 ? (
                <div className="space-y-2">
                  {reviews.map(review => (
                    <div key={review.id} className="flex items-start justify-between bg-secondary/30 p-3 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-quinary">{review.name} - {review.product}</p>
                        <div className="flex text-tertiary text-sm mb-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <p className="text-sm text-quaternary italic">"{review.review}"</p>
                        <p className="text-xs text-quaternary mt-1">{review.date}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="ml-3 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center flex-shrink-0"
                        title="Delete review"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-quaternary text-center py-8">No reviews yet. Customers can add reviews from the website.</p>
              )}
            </div>
          )}
           

          {/* Movies Tab */}
          {activeTab === 'movies' && (
            <div>
              <h3 className="text-2xl font-bold text-quinary mb-4">Manage Movie Reviews</h3>
              
              {/* Existing Movies */}
              {movies.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-quaternary mb-3">Current Movies</h4>
                  <div className="space-y-2">
                    {movies.map(movie => (
                      <div key={movie.id} className="flex items-start justify-between bg-secondary/30 p-3 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-quinary">{movie.title} ({movie.year})</p>
                          <div className="flex text-tertiary text-sm mb-1">
                            {[...Array(movie.rating)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          <p className="text-sm text-quaternary italic">"{movie.vision.substring(0, 100)}..."</p>
                        </div>
                        <button
                          onClick={() => handleDeleteMovie(movie.id)}
                          className="ml-3 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center flex-shrink-0"
                          title="Delete movie"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add New Movie Form */}
              <form onSubmit={handleAddMovie} className="space-y-4 border-t border-secondary pt-4">
                <h4 className="font-semibold text-quaternary">Add New Movie Review</h4>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Movie Title</label>
                  <input
                    type="text"
                    required
                    value={movieForm.title}
                    onChange={(e) => setMovieForm({...movieForm, title: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
                    placeholder="e.g., Inception"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-quaternary font-semibold mb-2">Year</label>
                    <input
                      type="text"
                      required
                      value={movieForm.year}
                      onChange={(e) => setMovieForm({...movieForm, year: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-quaternary font-semibold mb-2">Rating (1-5)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="5"
                      value={movieForm.rating}
                      onChange={(e) => setMovieForm({...movieForm, rating: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Your Vision</label>
                  <textarea
                    required
                    value={movieForm.vision}
                    onChange={(e) => setMovieForm({...movieForm, vision: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none h-24"
                    placeholder="Share your thoughts about the movie..."
                  />
                </div>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Movie Poster</label>
                  {movieImagePreview && (
                    <div className="relative mb-4">
                      <img src={movieImagePreview} alt="Preview" className="w-48 h-48 object-cover rounded-lg border-2 border-secondary" />
                      <button
                        type="button"
                        onClick={() => {
                          setMovieImageFile(null);
                          setMovieImagePreview('');
                          setMovieForm({...movieForm, poster: ''});
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setMovieImageFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setMovieImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
                  />
                  <p className="text-sm text-gray-600 mt-1">Upload poster (Max 5MB, JPG/PNG/GIF/WebP)</p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-tertiary text-white py-3 rounded-lg hover:bg-quaternary transition-colors font-semibold shadow-lg"
                >
                  Add Movie
                </button>
              </form>
            </div>
          )}

          {/* Fitness Tab */}
          {activeTab === 'fitness' && (
            <div>
              <h3 className="text-2xl font-bold text-quinary mb-4">Manage Fitness Journey</h3>
              
              {/* Existing Fitness Milestones */}
              {fitness.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-quaternary mb-3">Current Milestones</h4>
                  <div className="space-y-2">
                    {fitness.map(item => (
                      <div key={item.id} className="flex items-start justify-between bg-secondary/30 p-3 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-quinary">{item.year} - {item.milestone}</p>
                          <p className="text-sm text-quaternary">{item.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteFitness(item.id)}
                          className="ml-3 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center flex-shrink-0"
                          title="Delete milestone"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add New Fitness Milestone Form */}
              <form onSubmit={handleAddFitness} className="space-y-4 border-t border-secondary pt-4">
                <h4 className="font-semibold text-quaternary">Add New Fitness Milestone</h4>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Year</label>
                  <input
                    type="text"
                    required
                    value={fitnessForm.year}
                    onChange={(e) => setFitnessForm({...fitnessForm, year: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Milestone</label>
                  <input
                    type="text"
                    required
                    value={fitnessForm.milestone}
                    onChange={(e) => setFitnessForm({...fitnessForm, milestone: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
                    placeholder="e.g., Started Training"
                  />
                </div>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Description</label>
                  <textarea
                    required
                    value={fitnessForm.description}
                    onChange={(e) => setFitnessForm({...fitnessForm, description: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none h-24"
                    placeholder="Describe this milestone..."
                  />
                </div>
                <div>
                  <label className="block text-quaternary font-semibold mb-2">Milestone Image</label>
                  {fitnessImagePreview && (
                    <div className="relative mb-4">
                      <img src={fitnessImagePreview} alt="Preview" className="w-48 h-48 object-cover rounded-lg border-2 border-secondary" />
                      <button
                        type="button"
                        onClick={() => {
                          setFitnessImageFile(null);
                          setFitnessImagePreview('');
                          setFitnessForm({...fitnessForm, image: ''});
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFitnessImageFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFitnessImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:border-tertiary focus:outline-none"
                  />
                  <p className="text-sm text-gray-600 mt-1">Upload image (Max 5MB, JPG/PNG/GIF/WebP)</p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-tertiary text-white py-3 rounded-lg hover:bg-quaternary transition-colors font-semibold shadow-lg"
                >
                  Add Milestone
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
