import { api } from '../lib/api';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const baseProducts: Product[] = [
  {
    id: 1,
    name: "Pure Organic Honey",
    price: 25.99,
    description: "100% natural honey harvested from pristine locations, rich in flavor and nutrients",
    category: "business",
    image: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    name: "Raw Wildflower Honey",
    price: 29.99,
    description: "Unfiltered wildflower honey with natural enzymes and antioxidants",
    category: "business",
    image: "https://via.placeholder.com/300"
  },
  {
    id: 3,
    name: "Natural Peanut Butter",
    price: 12.99,
    description: "Creamy peanut butter made from 100% roasted peanuts, no additives",
    category: "business",
    image: "https://via.placeholder.com/300"
  },
  {
    id: 4,
    name: "Almond Butter",
    price: 15.99,
    description: "Premium almond butter packed with protein and healthy fats",
    category: "business",
    image: "https://via.placeholder.com/300"
  }
];

export async function getAllProducts(): Promise<Product[]> {
  try {
    const apiProducts = await api.getProducts();
    return [...baseProducts, ...apiProducts];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return baseProducts;
  }
}

export const productsData: Product[] = baseProducts;
