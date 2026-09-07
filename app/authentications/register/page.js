"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { createUser } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const dispatch = useDispatch()
  const router = useRouter()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(createUser(form))
    if (result.payload.success) {
      alert(result.payload.message)
      setForm({
        name: "",
        email: "",
        password: "",
        role: "customer",
      })
      router.push('/authentications/login')
    }
    else{
      alert(result.payload)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 px-4 py-12 overflow-hidden">

      {/* Aurora glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 sm:p-10 rounded-3xl w-full max-w-md"
      >
        {/* Icon badge */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-1 tracking-tight">
          Create account
        </h1>
        <p className="text-white/50 text-center text-sm mb-8">
          Join us — it only takes a minute
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-widest">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Jane Smith"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 py-3.5 px-4 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:border-violet-500/50 transition-all duration-200"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-widest">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 py-3.5 px-4 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:border-violet-500/50 transition-all duration-200"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-widest">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 py-3.5 px-4 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:border-violet-500/50 transition-all duration-200"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Role select */}
        <div className="mb-6">
          <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-widest">
            Role
          </label>
          <div className="relative w-full">
            {/* Icon Left */}

            <select
              name="role"
              onChange={handleChange}
              defaultValue="customer"
              className="
                      w-full 
                      appearance-none 
                      bg-white/10 
                      backdrop-blur-lg
                      border border-gray-600
                      text-white 
                      py-3 sm:py-4
                      pl-12 pr-12
                      rounded-2xl
                      text-sm sm:text-base
                      shadow-lg
                      transition-all duration-300
                      hover:border-violet-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-violet-500
                      focus:border-violet-500
                      cursor-pointer
                    "
            >
              <option value="customer" className="bg-slate-800 text-white">
                👤 Customer
              </option>

              <option value="vendor" className="bg-slate-800 text-white">
                🏪 Vendor
              </option>

              <option value="admin" className="bg-slate-800 text-white">
                ⚡ Admin
              </option>
            </select>

            {/* Custom Arrow */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              ▼
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Create account
        </button>

        <p className="text-center text-white/40 text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/authentications/login"
            className="text-violet-400 font-semibold hover:text-violet-300 transition-colors"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}