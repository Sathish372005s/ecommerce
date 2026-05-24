import React from 'react'
import { useorderstore } from '../store/orderstore';
import loadrazorpay from '../utils/loadrazorpay';

function Checkout() {
  const { createonlineorder , createcodorder,loading,error } = useorderstore();
  const [paymentMethod, setPaymentMethod] = React.useState("online");
  const [formData, setFormData] = React.useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    phone: ""
  })
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };
  const handleonlinepayment = async() => {
    try{
        const shippingAddress = {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country
        }
        const data = await createonlineorder(shippingAddress, formData.phone)
    
        const isloaded = await loadrazorpay();
        if (!isloaded) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "AURONIX",
            description: "Test Transaction",
            order_id: data.razorpayOrderId,
            handler: function () {
                alert("Payment successful!");
                window.location.href = "/orders";
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    catch(error){
        alert(error)
    }
  }

    const handlecodpayment = async() => {
        try{
            const shippingAddress = {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
                country: formData.country
            }
            await createcodorder(shippingAddress, formData.phone)
            alert("Order placed successfully!")
             window.location.href = "/orders";
        }
        catch(error){
            alert(error)
        }
    }

    const placeorder = () => {
        if(paymentMethod === "online"){
            handleonlinepayment();
        }
        else{
            handlecodpayment();
        }
    }



  return (
    
    <div
      className="
      max-w-2xl
      mx-auto
      p-6
    "
    >

      <div
        className="
        bg-white
        shadow-lg
        rounded-2xl
        p-6
        space-y-4
      "
      >

        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Checkout
        </h1>

        {/* INPUTS */}

        <input
          type="text"
          name="street"
          placeholder="Street"

          onChange={handleChange}

          className="
          w-full
          border
          p-3
          rounded-lg
        "
        />

        <input
          type="text"
          name="city"
          placeholder="City"

          onChange={handleChange}

          className="
          w-full
          border
          p-3
          rounded-lg
        "
        />

        <input
          type="text"
          name="state"
          placeholder="State"

          onChange={handleChange}

          className="
          w-full
          border
          p-3
          rounded-lg
        "
        />

        <input
          type="text"
          name="zip"
          placeholder="ZIP"

          onChange={handleChange}

          className="
          w-full
          border
          p-3
          rounded-lg
        "
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"

          onChange={handleChange}

          className="
          w-full
          border
          p-3
          rounded-lg
        "
        />

        {/* PAYMENT METHOD */}

        <div
          className="
          flex
          gap-4
        "
        >

          <label
            className="
            flex
            items-center
            gap-2
          "
          >

            <input
              type="radio"

              checked={
                paymentMethod ===
                "online"
              }

              onChange={() =>
                setPaymentMethod(
                  "online"
                )
              }
            />

            Online Payment

          </label>

          <label
            className="
            flex
            items-center
            gap-2
          "
          >

            <input
              type="radio"

              checked={
                paymentMethod ===
                "cod"
              }

              onChange={() =>
                setPaymentMethod(
                  "cod"
                )
              }
            />

            Cash On Delivery

          </label>

        </div>

        {/* ERROR */}

        {
          error && (

            <p
              className="
              text-red-500
            "
            >
              {error}
            </p>

          )
        }

        {/* BUTTON */}

        <button

          onClick={placeorder}

          disabled={loading}

          className="
          w-full
          bg-black
          text-white
          py-3
          rounded-xl
        "
        >

          {
            loading
              ? "Processing..."
              : "Place Order"
          }

        </button>

      </div>

    </div>
  )
}

export default Checkout
