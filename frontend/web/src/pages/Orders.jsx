import React, { useEffect } from "react";

import { Package } from "lucide-react";

import { useorderstore } from "../store/orderstore";

export default function Orders() {

  const {
    order,
    loading,
    error,
    getmyorders
  } = useorderstore();

  useEffect(() => {

    getmyorders();

  }, []);

  // LOADING

  if (loading) {

    return (

      <div
        className="
        min-h-screen
        bg-gray-50
        flex
        items-center
        justify-center
      "
      >

        <p
          className="
          text-xl
          font-semibold
          animate-pulse
        "
        >
          Loading Orders...
        </p>

      </div>

    );

  }

  // ERROR

  if (error) {

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
      "
      >

        <p
          className="
          text-red-500
          text-lg
          font-semibold
        "
        >
          {error}
        </p>

      </div>

    );

  }

  return (

    <div
      className="
      min-h-screen
      bg-gray-50
      px-4
      md:px-8
      py-8
    "
    >

      {/* HEADING */}

      <div
        className="
        flex
        items-center
        gap-3
        mb-8
      "
      >

        <Package
          className="
          w-8
          h-8
          text-blue-600
        "
        />

        <h1
          className="
          text-3xl
          font-bold
          text-gray-800
        "
        >
          My Orders
        </h1>

      </div>

      {/* EMPTY */}

      {
        order.length === 0 ? (

          <div
            className="
            bg-white
            rounded-2xl
            shadow-md
            p-10
            text-center
          "
          >

            <h2
              className="
              text-2xl
              font-semibold
              text-gray-700
            "
            >
              No Orders Found
            </h2>

            <p
              className="
              text-gray-500
              mt-2
            "
            >
              Your orders will appear here.
            </p>

          </div>

        ) : (

          <div
            className="
            space-y-6
          "
          >

            {
              order.map((item) => (

                <div

                  key={item._id}

                  className="
                  bg-white
                  rounded-3xl
                  shadow-md
                  p-6
                  border
                  border-gray-100
                "
                >

                  {/* TOP */}

                  <div
                    className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-5
                    border-b
                    pb-5
                  "
                  >

                    {/* LEFT */}

                    <div>

                      <p
                        className="
                        text-lg
                        font-bold
                        text-gray-800
                      "
                      >
                        Order ID
                      </p>

                      <p
                        className="
                        text-sm
                        text-gray-500
                        mt-1
                      "
                      >
                        {item._id}
                      </p>

                      <p
                        className="
                        text-sm
                        text-gray-400
                        mt-2
                      "
                      >
                        {
                          new Date(
                            item.createdAt
                          ).toLocaleString()
                        }
                      </p>

                    </div>

                    {/* RIGHT */}

                    <div
                      className="
                      text-left
                      md:text-right
                    "
                    >

                      <p
                        className="
                        text-2xl
                        font-bold
                        text-gray-900
                      "
                      >
                        ₹ {item.totalAmount}
                      </p>

                      <div
                        className="
                        flex
                        flex-wrap
                        gap-2
                        mt-2
                        md:justify-end
                      "
                      >

                        <span
                          className="
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          bg-yellow-100
                          text-yellow-700
                          capitalize
                        "
                        >
                          {item.orderStatus}
                        </span>

                        <span
                          className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          capitalize

                          ${
                            item.paymentStatus ===
                            "paid"

                              ? `
                              bg-green-100
                              text-green-700
                              `

                              : `
                              bg-red-100
                              text-red-700
                              `
                          }
                        `}
                        >
                          {item.paymentStatus}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* PRODUCTS */}

                  <div
                    className="
                    mt-6
                    space-y-5
                  "
                  >

                    {
                      item.items?.map(
                        (cartItem) => (

                          <div

                            key={cartItem._id}

                            className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            justify-between
                            gap-5
                          "
                          >

                            {/* PRODUCT */}

                            <div
                              className="
                              flex
                              gap-4
                              items-center
                            "
                            >

                              <img

                                src={
                                  cartItem.product
                                    ?.images?.[0]
                                }

                                alt={
                                  cartItem.product
                                    ?.name
                                }

                                className="
                                w-24
                                h-24
                                rounded-2xl
                                object-cover
                                border
                              "
                              />

                              <div>

                                <h2
                                  className="
                                  text-lg
                                  font-semibold
                                  text-gray-800
                                "
                                >
                                  {
                                    cartItem.product
                                      ?.name
                                  }
                                </h2>

                                <p
                                  className="
                                  text-gray-500
                                  text-sm
                                  mt-1
                                "
                                >
                                  Size:
                                  {" "}
                                  {
                                    cartItem.size
                                  }
                                </p>

                                <p
                                  className="
                                  text-gray-500
                                  text-sm
                                "
                                >
                                  Quantity:
                                  {" "}
                                  {
                                    cartItem.quantity
                                  }
                                </p>

                              </div>

                            </div>

                            {/* PRICE */}

                            <div
                              className="
                              text-lg
                              font-bold
                              text-gray-900
                            "
                            >
                              ₹ {cartItem.price}
                            </div>

                          </div>

                        )
                      )
                    }

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  );

}