export interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  date: string;
  product: string;
}

export const portfolioData: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    review: "The pure organic honey is absolutely delicious! You can taste the quality in every spoonful. Best honey I've ever had!",
    rating: 5,
    date: "Nov 2025",
    product: "Pure Organic Honey"
  },
  {
    id: 2,
    name: "Michael Chen",
    review: "Raw wildflower honey is exceptional. The natural enzymes and flavor are unmatched. Highly recommend!",
    rating: 5,
    date: "Oct 2025",
    product: "Raw Wildflower Honey"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    review: "The peanut butter is so fresh and creamy! No weird additives, just pure peanuts. My kids love it!",
    rating: 5,
    date: "Dec 2025",
    product: "Natural Peanut Butter"
  },
  {
    id: 4,
    name: "David Thompson",
    review: "Almond butter is perfect for my morning smoothies. Great quality and taste. Will definitely order again!",
    rating: 5,
    date: "Nov 2025",
    product: "Almond Butter"
  },
  {
    id: 5,
    name: "Priya Sharma",
    review: "Amazing honey! I use it in my tea every morning. The quality and purity are evident. Five stars!",
    rating: 5,
    date: "Oct 2025",
    product: "Pure Organic Honey"
  },
  {
    id: 6,
    name: "James Wilson",
    review: "Best nut butters I've found! No oil separation, perfect texture, and incredible flavor. Highly satisfied!",
    rating: 5,
    date: "Dec 2025",
    product: "Almond Butter"
  }
];
