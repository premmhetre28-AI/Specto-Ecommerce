"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { loginUser, getUser } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form))
    if (result.payload.success) {
      alert(result.payload.message)
      if(result.payload.user.role=="customer"){
        router.push('/my-app/app/roles/customer_system')
      }
      else if(result.payload.user.role=="admin"){
        router.push('/my-app/app/roles/admin_system/dashboard')
      }
      else{
        router.push('/my-app/app/roles/vendor_system')
      }
      
    }
    else {
      alert(result.payload.message)
      router.push('/my-app/app/authentications/login')
    }
    setForm({
      email: "",
      password: ""
    })
  };
  useEffect(()=>{
    async function fetchUser() {
      const result = await dispatch(getUser())
      if (result.payload.success) {
        if(result.payload.user.role=="customer"){
          router.push('/my-app/app/roles/customer_system')
        }
        else if(result.payload.user.role=="admin"){
          router.push('/my-app/app/roles/admin_system/dashboard')
        }
        else{
          router.push('/my-app/app/roles/vendor_system')
        }
      }
    }
    fetchUser()
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A3.75 3.75 0 0012 1.5a3.75 3.75 0 00-3.75 3.75V9m-1.5 0h10.5A1.5 1.5 0 0118.75 10.5v9A1.5 1.5 0 0117.25 21h-10.5A1.5 1.5 0 015.25 19.5v-9A1.5 1.5 0 016.75 9z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Welcome Back
          </h1>

          <p className="text-center text-gray-300 mb-8">
            Sign in to continue
          </p>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-200 mb-2 text-sm">
              Email Address
            </label>

            <input
              type="email"
              value={form.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-200 mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              value={form.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <Link
              href="#"
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            Login
          </button>

          <p className="text-center text-gray-300 mt-6">
            Don't have an account?{" "}
            <Link
              href="/authentications/register"
              className="text-blue-400 font-semibold hover:text-blue-300"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}