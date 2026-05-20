import React from "react";
import { useproductstore } from "../store/productstore";

export default function Prodcat() {
  const { products, category } = useproductstore();

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 lg:px-10 py-6">
      
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold capitalize text-gray-800">
          {category} Collection
        </h1>
        <p className="text-gray-500 mt-2">
          Explore premium products with modern styles.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group"
          >
            
            {/* Product Image */}
            <div className="overflow-hidden relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-44 sm:h-56 object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Stock Badge */}
              <span
                className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white font-medium ${
                  product.sizes?.some(s => s.quantity > 0) || product.stock > 0
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {product.sizes?.some(s => s.quantity > 0) || product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Product Details */}
            <div className="p-4">
              
              {/* Product Name */}
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {product.description}
              </p>

              {/* Ratings */}
              <div className="flex items-center mt-3">
                <div className="flex text-yellow-400 text-sm">
                  {Array.from({
                    length: Math.round(product.ratings),
                  }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <span className="ml-2 text-sm text-gray-500">
                  ({product.ratings})
                </span>
              </div>

              {/* Price + Gender */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>

                <span className="text-xs uppercase tracking-wide text-gray-400">
                  {product.gender}
                </span>
              </div>

              {/* Button */}
              <button className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}