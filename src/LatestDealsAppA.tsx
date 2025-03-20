import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Heart,
  MessageCircle,
  ShoppingBag,
  Search,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data - Replace with actual API calls
interface Deal {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  upvotes: number;
  comments: number;
  store: string;
  category: string;
  link: string;
  endDate?: string; // Optional end date
  isPopular?: boolean; // Flag for popular deals
}

const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Amazing Smart TV Deal",
    description:
      "Get a 55-inch 4K Smart TV at an unbeatable price.  Perfect for movie nights!",
    price: 399.99,
    originalPrice: 799.99,
    imageUrl: "https://placehold.co/600x400/EEE/31343C?text=Smart+TV",
    upvotes: 125,
    comments: 32,
    store: "Amazon",
    category: "Electronics",
    link: "https://www.amazon.co.uk",
    endDate: "2024-07-30",
    isPopular: true,
  },
  {
    id: "2",
    title: "Super Comfy Sofa - 50% Off",
    description:
      "Upgrade your living room with this super comfy sofa.  Limited time offer!",
    price: 299.0,
    originalPrice: 599.0,
    imageUrl: "https://placehold.co/600x400/EEE/31343C?text=Sofa",
    upvotes: 88,
    comments: 15,
    store: "DFS",
    category: "Home & Furniture",
    link: "https://www.dfs.co.uk",
    endDate: "2024-07-28",
  },
  {
    id: "3",
    title: "Free Coffee at Starbucks",
    description:
      "Get a free coffee at Starbucks with any pastry purchase.  Today only!",
    price: 0.0,
    imageUrl: "https://placehold.co/600x400/EEE/31343C?text=Coffee",
    upvotes: 210,
    comments: 55,
    store: "Starbucks",
    category: "Food & Drink",
    link: "https://www.starbucks.co.uk",
    isPopular: true,
  },
  {
    id: "4",
    title: "Latest Gaming Laptop - 20% Off",
    description:
      "Experience the ultimate gaming with this high-performance laptop.",
    price: 1199.0,
    originalPrice: 1499.0,
    imageUrl: "https://placehold.co/600x400/EEE/31343C?text=Gaming+Laptop",
    upvotes: 95,
    comments: 28,
    store: "Currys PC World",
    category: "Electronics",
    link: "https://www.currys.co.uk",
  },
  {
    id: "5",
    title: "Designer Dress Sale - Up to 70% Off",
    description:
      "Huge discounts on a wide selection of designer dresses.  Don't miss out!",
    price: 49.99,
    originalPrice: 169.99,
    imageUrl: "https://placehold.co/600x400/EEE/3134C?text=Dress",
    upvotes: 142,
    comments: 41,
    store: "ASOS",
    category: "Fashion",
    link: "https://www.asos.com",
    endDate: "2024-08-05",
  },
  {
    id: "6",
    title: "Buy One Get One Free on Pizzas",
    description:
      "Get a free pizza when you buy one at full price.  Available for delivery and collection.",
    price: 12.99,
    imageUrl: "https://placehold.co/600x400/EEE/31343C?text=Pizza",
    upvotes: 180,
    comments: 62,
    store: "Pizza Hut",
    category: "Food & Drink",
    link: "https://www.pizzahut.co.uk",
    endDate: "2024-07-29",
    isPopular: true,
  },
  {
    id: "7",
    title: "Weekend Getaway - 30% Off",
    description:
      "Enjoy a relaxing weekend getaway with a 30% discount on all bookings.",
    price: 199.0,
    originalPrice: 285.0,
    imageUrl: "https://placehold.co/600x400/EEE/31343C?text=Travel",
    upvotes: 75,
    comments: 20,
    store: "Booking.com",
    category: "Travel",
    link: "https://www.booking.com",
  },
  {
    id: "8",
    title: "New Running Shoes - 25% Off",
    description:
      "Get the latest running shoes with advanced cushioning and support.",
    price: 74.99,
    originalPrice: 99.99,
    imageUrl: "https://placehold.co/600x400/EEE/31343C?text=Shoes",
    upvotes: 110,
    comments: 35,
    store: "Nike",
    category: "Sports & Outdoors",
    link: "https://www.nike.com",
    endDate: "2024-08-01",
  },
];

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const LatestDealsAppA = () => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Not actually loading, but good practice
  const [error, setError] = useState<string | null>(null); // For future error handling
  const [categories, setCategories] = useState<string[]>([]); // For future use
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Simulate fetching categories (in a real app, this would come from an API)
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(mockDeals.map((deal) => deal.category))
    );
    setCategories(["All", ...uniqueCategories]);
  }, []);

  // Simulate fetching deals (in a real app, this would be an API call)
  const fetchDeals = useCallback(() => {
    setLoading(true);
    setError(null);
    // Simulate API call delay
    setTimeout(() => {
      try {
        // In a real app, you'd filter deals here based on API response
        let filteredDeals = mockDeals;

        if (searchTerm) {
          const searchTermLower = searchTerm.toLowerCase();
          filteredDeals = filteredDeals.filter(
            (deal) =>
              deal.title.toLowerCase().includes(searchTermLower) ||
              deal.description.toLowerCase().includes(searchTermLower) ||
              deal.store.toLowerCase().includes(searchTermLower) ||
              deal.category.toLowerCase().includes(searchTermLower)
          );
        }
        if (selectedCategory && selectedCategory !== "All") {
          filteredDeals = filteredDeals.filter(
            (deal) => deal.category === selectedCategory
          );
        }

        setDeals(filteredDeals);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching deals.");
      } finally {
        setLoading(false);
      }
    }, 500); // Simulate 500ms delay
  }, [searchTerm, selectedCategory]);

  // Fetch deals on initial load and whenever search term or category changes
  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const handleUpvote = (id: string) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === id ? { ...deal, upvotes: deal.upvotes + 1 } : deal
      )
    );
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Ongoing";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        // Consistent date format
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Latest
            <span className="text-gray-800 dark:text-gray-200">Deals</span>
          </h1>
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <Button
              variant="outline"
              onClick={fetchDeals}
              className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 hover:text-blue-400 border-blue-500/30"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        {/* Category Filter (Added) */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedCategory === category
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        {/* Deals Grid */}
        {error ? (
          <div className="text-red-500 dark:text-red-400 flex items-center justify-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            {error}
          </div>
        ) : (
          <AnimatePresence>
            {deals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {deals.map((deal) => (
                  <motion.div
                    key={deal.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                      <CardHeader>
                        <div className="relative w-full h-40 overflow-hidden rounded-t-md">
                          <img
                            src={deal.imageUrl}
                            alt={deal.title}
                            className="object-cover w-full h-full"
                          />
                          {deal.isPopular && (
                            <Badge
                              variant="destructive"
                              className="absolute top-2 left-2 bg-red-500/90 text-white border-0"
                            >
                              Popular
                            </Badge>
                          )}
                          {deal.endDate && (
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-xs rounded-b-md">
                              {deal.endDate
                                ? `Ends: ${formatDate(deal.endDate)}`
                                : "Ongoing"}
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">
                          <a
                            href={deal.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {deal.title}
                          </a>
                        </CardTitle>

                        <CardDescription className="text-gray-500 dark:text-gray-400">
                          By {deal.store}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          {deal.description.length > 100
                            ? `${deal.description.substring(0, 100)}...`
                            : deal.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-green-600 dark:text-green-400">
                            £{deal.price.toFixed(2)}
                          </span>
                          {deal.originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              £{deal.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUpvote(deal.id)}
                            className="text-red-500 hover:bg-red-500/20"
                          >
                            <Heart className="h-5 w-5" />
                          </Button>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {deal.upvotes}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-500 hover:bg-blue-500/20"
                          >
                            <MessageCircle className="h-5 w-5" />
                          </Button>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {deal.comments}
                          </span>
                        </div>
                        <Button
                          asChild
                          variant="outline"
                          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <a
                            href={deal.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Get Deal
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  No deals found matching your criteria.
                </div>
              )
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-400 px-4">
          © {new Date().getFullYear()} Latest Deals. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LatestDealsAppA;
