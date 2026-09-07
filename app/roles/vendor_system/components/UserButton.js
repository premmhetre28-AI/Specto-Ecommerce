"use client";

import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";


export default function UserButton({ user }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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
        className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-200 hover:border-indigo-500 transition-all shadow-md"
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
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

          {/* Top Profile */}
          <div className="p-4 flex items-center gap-3 border-b bg-gray-50">

            <div className="w-12 h-12 rounded-full overflow-hidden">
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

            <div>
              <p className="font-semibold text-gray-800">
                {user.name}
              </p>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>

              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full capitalize">
                {user.role}
              </span>
            </div>
          </div>

          {/* Menu */}
          <div className="p-2">

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-100 transition">
              <User size={18} />
              Profile
            </button>

            
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-100 transition">
              <User size={18} />
              Order History
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-100 transition">
              <Settings size={18} />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

