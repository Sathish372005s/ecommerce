import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {useauthstore} from '../store/store.js'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [data, setdata] = useState({
    email: "",
    password: "",
  })
  const {error,message,loading,login} = useauthstore()
  const navigate = useNavigate()
  const handlelogin =(e)=>{
      e.preventDefault()
      login(data.email,data.password)
      if(message){
        console.log("login successfull")
        navigate("/")
      }
      else{
        console.log("error in login");
        return;
      }
  }
  const handlechange =(e)=>{
    const {name,value} = e.target
    setdata((prev)=>({ ...prev,[name]:value }))
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

  <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

    {/* Heading */}
    <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
      Login
    </h1>

    {/* Form */}
    <form onSubmit={handlelogin} className="space-y-5">

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handlechange}
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handlechange}
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition duration-300"
      >
        {
          loading ? "Loading..." : "Login"
        }
      </button>

    </form>

    {/* Error */}
    {
      error && (
        <p className="text-red-500 text-sm text-center mt-4">
          {error}
        </p>
      )
    }

    {/* Success */}
    {
      message && (
        <p className="text-green-500 text-sm text-center mt-4">
          {message}
        </p>
      )
    }

    {/* Register Link */}
    <p className="text-center text-sm text-gray-600 mt-6">
      Don&apos;t have an account?{" "}
      <Link
        to="/register"
        className="text-indigo-600 font-semibold hover:underline"
      >
        Register
      </Link>
    </p>

  </div>

</div>
  );
}
