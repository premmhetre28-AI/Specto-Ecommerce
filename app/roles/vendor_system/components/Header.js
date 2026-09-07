"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Truck,
  ShoppingCart,
  Home,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getUser } from "@/app/redux/slices/authSlice";
import UserButton from "./UserButton";

export default function Header() {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const res = await dispatch(getUser());

      if (res.payload.success) {
        setUser(res.payload.user);
      } else {
        alert(res.payload.message);
      }
    }

    fetchUser();
  }, [dispatch]);


  const navItems = [
    {
      name: "Dashboard",
      href: "/roles/vendor_system/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Suppliers",
      href: "/roles/vendor_system/suppliers",
      icon: Truck,
    },
    {
      name: "Orders",
      href: "/roles/vendor_system/orders",
      icon: ShoppingCart,
    },
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
  ];


  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">

        {/* Main Header */}
        <div
          className="
            bg-white/90 backdrop-blur-xl
            border-b border-gray-200/80
            shadow-[0_4px_25px_rgba(0,0,0,0.06)]
          "
        >

          <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">

            <div className="h-16 sm:h-[72px] flex items-center justify-between">

              {/* ================= LOGO ================= */}

              <Link
                href="/roles/vendor_system"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 sm:gap-3 group"
              >

                {/* Logo Icon */}
                <div
                  className="
                    relative
                    w-10 h-10 sm:w-11 sm:h-11
                    rounded-xl
                    bg-gradient-to-br
                    from-blue-600 via-indigo-600 to-purple-600
                    flex items-center justify-center
                    shadow-lg shadow-blue-500/20
                    group-hover:scale-105
                    group-hover:rotate-1
                    transition-all duration-300
                  "
                >

                  <span
                    className="
                      text-white
                      text-xl sm:text-2xl
                      font-black italic
                    "
                  >
                    S
                  </span>

                  <span
                    className="
                      absolute
                      -top-1
                      -right-1
                      w-3 h-3
                      rounded-full
                      bg-blue-400
                      border-2 border-white
                    "
                  />

                </div>


                {/* Brand */}
                <div className="flex items-center">

                  <span
                    className="
                      text-lg sm:text-xl lg:text-2xl
                      font-extrabold
                      bg-gradient-to-r
                      from-blue-600
                      via-indigo-600
                      to-purple-600
                      bg-clip-text
                      text-transparent
                      tracking-tight
                    "
                  >
                    Specto
                    <span className="hidden sm:inline">
                      {" "}Management
                    </span>
                  </span>

                  <Sparkles
                    size={16}
                    className="
                      ml-1
                      text-blue-500
                      animate-pulse
                      hidden xs:block sm:block
                    "
                  />

                </div>

              </Link>


              {/* ================= DESKTOP NAV ================= */}

              <nav className="hidden md:flex items-center">

                <div
                  className="
                    flex items-center gap-1
                    p-1.5
                    bg-gray-100/80
                    border border-gray-200
                    rounded-2xl
                  "
                >

                  {navItems.map((item) => {

                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="
                          flex items-center gap-2
                          px-4 py-2.5
                          rounded-xl
                          text-sm
                          font-medium
                          text-gray-600
                          hover:text-blue-600
                          hover:bg-white
                          hover:shadow-sm
                          transition-all duration-200
                        "
                      >

                        <Icon size={17} />

                        <span>
                          {item.name}
                        </span>

                      </Link>
                    );
                  })}

                </div>

              </nav>


              {/* ================= RIGHT SIDE ================= */}

              <div className="flex items-center gap-2 sm:gap-3">

                {/* Desktop User */}
                <div className="hidden md:block">
                  <UserButton user={user} />
                </div>


                {/* Mobile Hamburger */}
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  aria-label="Toggle navigation menu"
                  aria-expanded={open}
                  className="
                    md:hidden
                    flex items-center justify-center
                    w-10 h-10 sm:w-11 sm:h-11
                    rounded-xl
                    bg-gray-100
                    border border-gray-200
                    text-gray-700
                    hover:bg-blue-50
                    hover:text-blue-600
                    active:scale-95
                    transition-all duration-200
                  "
                >

                  {open ? (
                    <X size={25} />
                  ) : (
                    <Menu size={25} />
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>


        {/* ================= MOBILE MENU ================= */}

        <div
          className={`
            md:hidden
            fixed inset-x-0 top-16 sm:top-[72px]
            transition-all duration-300 ease-in-out
            ${open
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
            }
          `}
        >

          {/* Background Overlay */}
          <div
            className="
              fixed inset-0
              top-16 sm:top-[72px]
              bg-black/30
              backdrop-blur-sm
            "
            onClick={() => setOpen(false)}
          />


          {/* Menu Panel */}
          <div
            className={`
              relative
              mx-3 sm:mx-5
              mt-3
              rounded-2xl
              bg-white
              border border-gray-200
              shadow-2xl
              overflow-hidden
              transform
              transition-all duration-300
              ${open
                ? "translate-y-0"
                : "-translate-y-4"
              }
            `}
          >

            {/* User Section */}
            <div
              className="
                p-4
                bg-gradient-to-r
                from-blue-50
                via-indigo-50
                to-purple-50
                border-b border-gray-200
              "
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <UserButton user={user} />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || "Guest"}
                  </span>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="
                    text-xs
                    font-medium
                    text-gray-500
                    hover:text-blue-600
                  "
                >
                  Close
                </button>

              </div>

            </div>


            {/* Navigation */}
            <nav className="p-3">

              {navItems.map((item) => {

                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="
                      group
                      flex items-center justify-between
                      px-4 py-3.5
                      rounded-xl
                      text-gray-700
                      hover:bg-blue-50
                      hover:text-blue-600
                      transition-all duration-200
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-9 h-9
                          rounded-lg
                          bg-gray-100
                          group-hover:bg-blue-100
                          flex items-center justify-center
                          transition
                        "
                      >
                        <Icon size={18} />
                      </div>

                      <span className="font-medium">
                        {item.name}
                      </span>

                    </div>


                    <ChevronRight
                      size={18}
                      className="
                        text-gray-400
                        group-hover:text-blue-600
                        group-hover:translate-x-1
                        transition
                      "
                    />

                  </Link>
                );
              })}

            </nav>

          </div>

        </div>

      </header>


      {/* Header Space */}
      <div className="h-16 sm:h-[72px]" />
    </>
  );
}