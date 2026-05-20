import React, { useEffect, useRef, useCallback } from "react";
import { useproductstore } from "../store/productstore";
import Singleprod from "./Singleprod";

export default function Allprod() {
  const {
    getallproducts,
    products,
    loading,
    hasMore,
    getproductbyid
  } = useproductstore();

  const observer = useRef();
  
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        getallproducts();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, getallproducts]);

  useEffect(() => {
    // Only fetch initially if products are empty to avoid double fetching on mount
    if (products.length === 0) {
      getallproducts();
    }
  }, []);

  const getsingleprod = async (id) =>{
    
    console.log(id)
    await getproductbyid(id)

  }

  const renderProductCard = (product, isLast) => (
    <div
      
      ref={isLast ? lastElementRef : null}
      key={product._id}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group"
      onClick={()=>{getsingleprod(product._id)}}
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
            product.sizes?.some(s => s.quantity > 0) || product.stock > 0 ? "bg-green-500" : "bg-red-500"
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
              length: Math.round(product.ratings || 0),
            }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>

          <span className="ml-2 text-sm text-gray-500">
            ({product.ratings || 0})
          </span>
        </div>

        {/* Price + Gender */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price}
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
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        {products.map((product, index) => {
          const isLast = products.length === index + 1;
          return renderProductCard(product, isLast);
        })}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-5">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Single Product Modal */}
      <Singleprod />
    </div>
  );
}
