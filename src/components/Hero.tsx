import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import { heroData } from '../data/hero';

export default function Hero() {
  const { isAdmin } = useAuth();
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/400');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadHeroImage();
  }, []);

  const loadHeroImage = async () => {
    try {
      const heroData = await api.getHero();
      setProfileImage(heroData.profileImage);
    } catch (error) {
      console.error('Failed to load hero image:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Upload image
      const uploadResult = await api.uploadImage(file);
      
      // Update hero image
      await api.updateHeroImage(uploadResult.url);
      
      // Update local state
      setProfileImage(uploadResult.url);
      alert('Profile image updated successfully!');
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!confirm('Are you sure you want to remove the profile image?')) return;

    try {
      // Reset to placeholder (backend will delete the old file)
      await api.updateHeroImage('https://via.placeholder.com/400');
      setProfileImage('https://via.placeholder.com/400');
      
      console.log('✅ Profile image deleted successfully');
      alert('Profile image removed successfully!');
    } catch (error) {
      console.error('❌ Failed to delete image:', error);
      alert('Failed to delete image. Please try again.');
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-quinary via-quaternary to-tertiary py-20 px-6 overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-secondary opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Photo and Name Layout */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          {/* Photo Frame on Left */}
          <div className="flex-shrink-0 animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary to-tertiary rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-tertiary to-quaternary rounded-2xl overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Gokul"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute bottom-0 right-0 flex gap-2 p-2">
                    <label className="cursor-pointer bg-tertiary text-white p-2 rounded-full hover:bg-quaternary transition-colors shadow-lg">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      {uploading ? '⏳' : '📷'}
                    </label>
                    {profileImage !== 'https://via.placeholder.com/400' && (
                      <button
                        onClick={handleDeleteImage}
                        className="bg-quaternary text-white p-2 rounded-full hover:bg-quinary transition-colors shadow-lg"
                        title="Remove image"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Name and Info on Right */}
          <div className="flex-1 text-center md:text-left animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="inline-block bg-secondary text-quaternary px-6 py-2 rounded-full font-bold mb-4 shadow-lg">
              ✨ Welcome
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              It's {heroData.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-primary mb-6">
              {heroData.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold">
                💪 Fitness Enthusiast
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold">
                🎬 Movie Lover
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold">
                🍯 Entrepreneur
              </span>
            </div>
          </div>
        </div>
        
        {/* About Section */}
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border-2 border-secondary shadow-2xl animate-slide-up">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-tertiary text-white px-6 py-2 rounded-full font-bold shadow-lg">
            {heroData.about.title}
          </div>
          <p className="text-lg text-quaternary mt-4 leading-relaxed">
            {heroData.about.description}
          </p>
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
