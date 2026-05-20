import React, { useEffect, useState } from "react";
import { usecartstore } from "../store/cardstore";
import { useproductstore } from "../store/productstore";

export default function ProductDetails() {

  const { addtocart } = usecartstore();
  const { singleProduct, clearSingleProduct } = useproductstore();

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);


  // Set Main Product Image
  useEffect(() => {
    if (singleProduct?.images?.length > 0) {
      setMainImage(singleProduct.images[0]);
    }

  }, [singleProduct]);

  // Add To Cart
  const addtocart1 = async () => {

    try {

      // Product validation
      if (!singleProduct) return;

      // Size validation
      if (!selectedSize) {
        alert("Please select a size");
        return;
      }

      // Quantity validation
      if (quantity < 1) {
        alert("Quantity must be at least 1");
        return;
      }

      // Request Data
      const data = {
        productId: singleProduct._id,
        quantity,
        size: selectedSize,
      };

      // API Call
      await addtocart(data);

      // Reset States
      setQuantity(1);
      setSelectedSize("");

      // Success Message
      alert("Item added to cart");

      // Optional
      clearSingleProduct();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add item"
      );
    }
  };

  // Prevent Crash
  if (!singleProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">

      <div className="relative max-w-7xl w-full max-h-[90vh] overflow-y-auto mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-2xl p-6">
        <button
          onClick={clearSingleProduct}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
        >
          ✕
        </button>

        {/* Left Side Images */}
        <div>

          {/* Main Image */}
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border">

            {mainImage && (
              <img
                src={mainImage}
                alt={singleProduct.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Small Images */}
          <div className="flex gap-4 mt-4 overflow-x-auto">

            {singleProduct.images?.map((img, index) => (

              <img
                key={index}
                src={img}
                alt="product"
                onClick={() => setMainImage(img)}
                className={`w-24 h-24 rounded-xl object-cover cursor-pointer border-2 transition
                  ${
                    mainImage === img
                      ? "border-black"
                      : "border-gray-200"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side Product Info */}
        <div className="flex flex-col justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              {singleProduct.name}
            </h1>

            <p className="text-2xl font-semibold text-gray-700 mt-4">
              ₹ {singleProduct.price}
            </p>

            <p className="text-gray-600 mt-6 leading-7">
              {singleProduct.description}
            </p>

            {/* Size Selection */}
            <div className="mt-8">

              <h2 className="text-lg font-semibold mb-3">
                Select Size
              </h2>

              <div className="flex gap-4 flex-wrap">

                {["S", "M", "L", "XL"].map((size) => (

                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-xl border transition
                      ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">

              <h2 className="text-lg font-semibold mb-3">
                Quantity
              </h2>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      prev > 1 ? prev - 1 : 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>

                <span className="text-xl font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>

              </div>
            </div>
          </div>

          {/* Add To Cart Button */}
          <button
            onClick={addtocart1}
            className="w-full bg-black text-white py-4 rounded-2xl mt-10 text-lg font-semibold hover:bg-gray-800 transition"
          >
            Add To Cart
          </button>

        </div>
      </div>
    </div>
  );
}