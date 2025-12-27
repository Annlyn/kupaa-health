const API_BASE = 'http://localhost:3001/api';

export const api = {
  // Image upload
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  },

  async deleteImage(filename: string) {
    const response = await fetch(`${API_BASE}/upload/${filename}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Hero
  async getHero() {
    const response = await fetch(`${API_BASE}/hero`);
    return response.json();
  },

  async updateHeroImage(imageUrl: string) {
    const response = await fetch(`${API_BASE}/hero/image`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl })
    });
    return response.json();
  },

  // Cleanup utilities
  async checkOrphanedFiles() {
    const response = await fetch(`${API_BASE}/cleanup/check`);
    return response.json();
  },

  async cleanupOrphanedFiles() {
    const response = await fetch(`${API_BASE}/cleanup/orphaned`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Products
  async getProducts() {
    const response = await fetch(`${API_BASE}/products`);
    return response.json();
  },
  
  async createProduct(product: any) {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return response.json();
  },

  async deleteProduct(id: number) {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Reviews
  async getReviews() {
    const response = await fetch(`${API_BASE}/reviews`);
    return response.json();
  },
  
  async createReview(review: any) {
    const response = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    return response.json();
  },

  async deleteReview(id: number) {
    const response = await fetch(`${API_BASE}/reviews/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Movies
  async getMovies() {
    const response = await fetch(`${API_BASE}/movies`);
    return response.json();
  },
  
  async createMovie(movie: any) {
    const response = await fetch(`${API_BASE}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });
    return response.json();
  },

  async deleteMovie(id: number) {
    const response = await fetch(`${API_BASE}/movies/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Fitness
  async getFitness() {
    const response = await fetch(`${API_BASE}/fitness`);
    return response.json();
  },
  
  async createFitness(fitness: any) {
    const response = await fetch(`${API_BASE}/fitness`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fitness)
    });
    return response.json();
  },

  async deleteFitness(id: number) {
    const response = await fetch(`${API_BASE}/fitness/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};
