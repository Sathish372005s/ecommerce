import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'; 
import {useauthstore} from '../store/store.js'

import { useNavigate } from 'react-router-dom';

function Regiter() {
  const {sendotp,loading,error,otp,message,register,otpsend} = useauthstore()

    const navigate =useNavigate()
   
    const [data,setdata] = useState({
        name:"",
        email:"",
        password:"",
        otp:"",
    })
    const [otpsent ,setotpsent] = useState(false);
    const handlechange = (e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const handleotpsend =()=>{
      sendotp(data.email)
      setotpsent(true)
    }
    const handleregister =()=>{
       if(otpsend == false){
        alert("otp not send , send it first ")
        return
       }
       register(data.name,data.email,data.password,data.otp)
       navigate('/login')
       setdata({name:"",email:"",password:"",otp:""})
       setotpsent(false)
       alert("Registered successfully");
    }
  return (
 <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

    <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

    <form onSubmit={handleregister} className="space-y-4">

      {/* Name */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Name</label>
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="text"
          name="name"
          value={data.name}
          onChange={handlechange}
        />
      </div>

      {/* Email + OTP */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="email"
            name="email"
            value={data.email}
            onChange={handlechange}
          />
          <button
            type="button"
            onClick={handleotpsend}
            className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            {loading ? "..." : "Send OTP"}
          </button>
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Password</label>
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="password"
          name="password"
          value={data.password}
          onChange={handlechange}
        />
      </div>

      {/* OTP */}
      {otpsent && (
        <div>
          <label className="block text-sm text-gray-600 mb-1">OTP</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            name="otp"
            value={data.otp}
            onChange={handlechange}
          />
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
      >
        Register
      </button>

    </form>

    {/* Messages */}
    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
    {message && <p className="text-green-500 text-sm mt-4 text-center">{message}</p>}

  </div>
</div>
  )
}

export default Regiter