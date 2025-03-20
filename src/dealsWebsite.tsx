import React, { useState } from "react";
import {
  Search,
  Tag,
  ThumbsUp,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

const DealsWebsite = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample deals data
  const deals = [
    {
      id: 1,
      title: "50% off Nike Running Shoes",
      store: "Nike",
      price: "£45.00",
      originalPrice: "£90.00",
      discount: "50%",
      category: "fashion",
      likes: 245,
      comments: 32,
      image: "/api/placeholder/300/200",
      expiresIn: "2 days",
    },
    {
      id: 2,
      title: "Amazon Echo Dot - Latest Generation",
      store: "Amazon",
      price: "£29.99",
      originalPrice: "£49.99",
      discount: "40%",
      category: "electronics",
      likes: 189,
      comments: 24,
      image: "/api/placeholder/300/200",
      expiresIn: "5 days",
    },
    {
      id: 3,
      title: "Tesco Weekly Deal - 3 for 2 on all groceries",
      store: "Tesco",
      category: "groceries",
      likes: 156,
      comments: 18,
      image: "/api/placeholder/300/200",
      expiresIn: "3 days",
    },
  ];

  const categories = [
    { id: "all", name: "All Deals" },
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion" },
    { id: "groceries", name: "Groceries" },
    { id: "travel", name: "Travel" },
    { id: "entertainment", name: "Entertainment" },
  ];

  const filteredDeals =
    selectedCategory === "all"
      ? deals
      : deals.filter((deal) => deal.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">DealsHub</h1>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search for deals..."
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Submit Deal
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    {deal.store}
                  </span>
                  <span className="text-sm text-red-600">
                    Expires in {deal.expiresIn}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{deal.title}</h3>
                {deal.price && (
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                      {deal.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {deal.originalPrice}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {deal.discount} OFF
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                      <ThumbsUp size={18} />
                      <span>{deal.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                      <MessageSquare size={18} />
                      <span>{deal.comments}</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                    <span>Get Deal</span>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DealsWebsite;
