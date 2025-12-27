import { api } from '../lib/api';

export interface FitnessJourney {
  id: number;
  year: string;
  milestone: string;
  description: string;
  image: string;
}

export interface MovieReview {
  id: number;
  title: string;
  year: string;
  poster: string;
  vision: string;
  rating: number;
}

const baseFitness: FitnessJourney[] = [
  {
    id: 1,
    year: "2020",
    milestone: "The Beginning",
    description: "Started my fitness journey with basic bodyweight exercises and running. Committed to changing my lifestyle.",
    image: "https://via.placeholder.com/400x300"
  },
  {
    id: 2,
    year: "2021",
    milestone: "Building Foundation",
    description: "Joined a gym, learned proper form, and started following structured workout programs. Lost 15kg.",
    image: "https://via.placeholder.com/400x300"
  },
  {
    id: 3,
    year: "2022",
    milestone: "Strength & Discipline",
    description: "Achieved major strength milestones. Started helping friends with their fitness goals.",
    image: "https://via.placeholder.com/400x300"
  },
  {
    id: 4,
    year: "2023-Present",
    milestone: "Lifestyle & Coaching",
    description: "Fitness became my lifestyle. Now coaching others and continuously learning about optimization and nutrition.",
    image: "https://via.placeholder.com/400x300"
  }
];

const baseMovies: MovieReview[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: "1994",
    poster: "https://via.placeholder.com/300x450",
    vision: "A masterpiece about hope and perseverance. This film teaches us that no matter how dark the circumstances, the human spirit can never be truly imprisoned. The friendship between Andy and Red is one of cinema's most beautiful relationships. It's a reminder that patience, intelligence, and hope can overcome any obstacle.",
    rating: 5
  },
  {
    id: 2,
    title: "Inception",
    year: "2010",
    poster: "https://via.placeholder.com/300x450",
    vision: "Christopher Nolan's brilliant exploration of dreams and reality. The film challenges our perception and makes us question what's real. The layered storytelling and mind-bending visuals create an experience that stays with you long after. It's about the power of ideas and how they can change everything.",
    rating: 5
  },
  {
    id: 3,
    title: "Parasite",
    year: "2019",
    poster: "https://via.placeholder.com/300x450",
    vision: "A stunning social commentary wrapped in dark comedy and thriller elements. Bong Joon-ho masterfully exposes class divide and inequality. Every frame is meticulously crafted, every metaphor deliberate. It's cinema that entertains while making you think deeply about society.",
    rating: 5
  },
  {
    id: 4,
    title: "Interstellar",
    year: "2014",
    poster: "https://via.placeholder.com/300x450",
    vision: "An epic journey that combines science with profound human emotion. The film explores love transcending space and time, sacrifice for future generations, and humanity's will to survive. Hans Zimmer's score elevates every moment. It's both intellectually stimulating and emotionally devastating.",
    rating: 5
  }
];

export async function getAllFitness(): Promise<FitnessJourney[]> {
  try {
    const apiFitness = await api.getFitness();
    return [...baseFitness, ...apiFitness];
  } catch (error) {
    console.error('Failed to fetch fitness:', error);
    return baseFitness;
  }
}

export async function getAllMovies(): Promise<MovieReview[]> {
  try {
    const apiMovies = await api.getMovies();
    return [...baseMovies, ...apiMovies];
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return baseMovies;
  }
}

export const fitnessJourney: FitnessJourney[] = baseFitness;
export const movieReviews: MovieReview[] = baseMovies;
