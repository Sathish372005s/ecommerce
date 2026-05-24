import React, { useEffect } from "react";
import { usecartstore } from "../store/cardstore";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const { cart, getcart ,removecart} = usecartstore();

  useEffect(() => {
    getcart();
  }, []);

  const validItems = cart?.items?.filter(item => item.product) || [];
  const shipping = validItems.length > 0 && validItems.length < 2 ? 30 : 0;

  // Total Price
  const totalPrice = validItems.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  ) + shipping;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Shopping Cart
      </h1>

      {/* Empty Cart */}
      {validItems.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <h2 className="text-2xl font-semibold text-gray-500">
            Your cart is empty
          </h2>
        </div>
      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">

            {validItems.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition"
              >

                {/* Product Image */}
                <div className="w-full sm:w-40 h-40 flex-shrink-0">
                  <img
                    src={item?.product?.images?.[0]}
                    alt={item?.product?.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between flex-1">

                  <div>
                    <h2 className="text-xl font-semibold">
                      {item?.product?.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      ₹ {item?.product?.price}
                    </p>

                    <p className="text-gray-500">
                      Size: {item?.size || "M"}
                    </p>

                    <p className="text-gray-500">
                      Quantity: {item?.quantity}
                    </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex justify-between items-center mt-4">

                    {/* Quantity Buttons */}
                    <div className="flex items-center gap-3">

                      <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300">
                        -
                      </button>

                      <span className="font-semibold">
                        {item?.quantity}
                      </span>

                      <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300">
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button className="text-red-500 hover:text-red-700" onClick={()=>{removecart(item._id)}}>
                      <Trash2 size={22} />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-6">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{validItems.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹ {totalPrice}</span>
              </div>

              <button onClick={() => navigate("/checkout")} className="w-full bg-black text-white py-3 rounded-xl mt-6 hover:bg-gray-800 transition">
                Proceed to Checkout
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}