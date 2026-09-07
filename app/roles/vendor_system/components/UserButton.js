"use client";

import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";

export default function UserButton({ user }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click (supports both mouse and touch/mobile)
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); 
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    window.location.href = "/authentications/login";
  };

  return (
    <div className="relative" ref={menuRef}>

      {/* User Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 shrink-0 rounded-full overflow-hidden border-2 border-gray-200 hover:border-indigo-500 transition-all shadow-md focus:outline-none"
      >
        {user?.image ? (
          <img
            src={user.image}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold uppercase">
            {user?.name?.charAt(0)}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="fixed top-12 right-4 sm:absolute sm:top-full sm:right-0 sm:mt-3 w-[90vw] max-w-[18rem] sm:w-72 max-h-[75dvh] overflow-y-auto overflow-x-hidden bg-white rounded-2xl shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200 z-[9999]">

          {/* Top Profile */}
          <div className="p-4 flex items-center gap-3 border-b bg-gray-50">

            <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
              {user?.image ? (
                <img
                  src={user.image}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold uppercase">
                  {user?.name?.charAt(0)}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 flex flex-col items-start">
              <p className="w-full font-semibold text-gray-800 truncate" title={user?.name}>
                {user?.name}
              </p>

              <p className="w-full text-sm text-gray-500 truncate mb-1" title={user?.email}>
                {user?.email}
              </p>

              <span className="inline-block text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full capitalize truncate max-w-full">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Menu */}
          <div className="p-2">

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-100 sm:hover:bg-gray-100 transition">
              <User size={18} className="shrink-0" />
              <span className="truncate">Profile</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-100 sm:hover:bg-gray-100 transition">
              <User size={18} className="shrink-0" />
              <span className="truncate">Order History</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-100 sm:hover:bg-gray-100 transition">
              <Settings size={18} className="shrink-0" />
              <span className="truncate">Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 active:bg-red-50 sm:hover:bg-red-50 transition"
            >
              <LogOut size={18} className="shrink-0" />
              <span className="truncate">Logout</span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}