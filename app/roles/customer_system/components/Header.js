"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { ShoppingBag, Menu, ChevronDown, X, Sparkles } from "lucide-react";
import { getUser } from '@/app/redux/slices/authSlice';
import UserButton from '@/app/roles/vendor_system/components/UserButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from "@/app/redux/slices/cartSlice";

const Header = () => {
    const [user, setUser] = useState([]);
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuopen] = useState(false);
    const dispatch = useDispatch();
    const { quantity } = useSelector((state) => state.cart);

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
        dispatch(fetchCart());
    }, [dispatch]);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2 md:gap-4">

                {/* Logo */}
                <Link
                    href="/roles/customer_system"
                    className="flex items-center gap-2 sm:gap-3 group shrink-0"
                >
                    {/* Logo Icon */}
                    <div
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl 
                        bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 
                        flex items-center justify-center 
                        shadow-lg group-hover:scale-105 transition duration-300 shrink-0"
                    >
                        <span className="text-white text-xl sm:text-2xl font-extrabold italic">
                            S
                        </span>
                    </div>

                    {/* Brand Name (Hides text on extremely small screens < 380px to save space) */}
                    <div className="hidden min-[380px]:flex items-center">
                        <span
                            className="text-xl sm:text-2xl font-extrabold 
                            bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                            bg-clip-text text-transparent tracking-tight"
                        >
                            Specto
                        </span>

                        <Sparkles
                            className="ml-1 text-blue-500 animate-pulse w-4 h-4 sm:w-[18px] sm:h-[18px]"
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 lg:space-x-8 whitespace-nowrap">
                    <Link
                        href="/roles/customer_system"
                        className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                    >
                        Home
                    </Link>

                    {/* Shop Dropdown */}
                    <div className="relative group">
                        <button className="text-gray-900 font-medium hover:text-blue-600 transition-colors flex items-center">
                            Shop
                            <ChevronDown size={18} className="ml-1" />
                        </button>

                        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded hidden group-hover:block">
                            <Link href="/shop/women" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                Women
                            </Link>
                            <Link href="/shop/men" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                Men
                            </Link>
                            <Link href="/shop/accessories" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                Accessories
                            </Link>
                            <Link href="/shop/footwear" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                Footwear
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/new-arrivals"
                        className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                    >
                        New Arrivals
                    </Link>

                    <Link
                        href="/sale"
                        className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                    >
                        Sale
                    </Link>

                    <Link
                        href="/roles/customer_system/dashboard/orders"
                        className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                    >
                        Orders
                    </Link>
                </nav>

                {/* Right Side Icons */}
                <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-1 md:flex-none justify-end">

                    {/* Search */}
                    <div className="w-[130px] sm:w-[200px] md:w-[250px] lg:w-[350px]">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                            className="
                                flex items-center gap-1 sm:gap-2
                                bg-slate-900/95 backdrop-blur-md
                                border border-slate-700
                                rounded-full
                                px-2 sm:px-4
                                py-1 sm:py-1.5
                                shadow-lg
                                transition-all duration-300
                                focus-within:ring-2 focus-within:ring-blue-500
                            "
                        >
                            {/* Input */}
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search..."
                                className="
                                    flex-1 min-w-0
                                    bg-transparent
                                    px-1 sm:px-2
                                    text-xs sm:text-base
                                    text-white
                                    placeholder-gray-400
                                    outline-none
                                "
                            />

                            {/* Search Button */}
                            <Link href={`/roles/customer_system/products/searchedProducts?query=${query}`} className="shrink-0">
                                <button
                                    type="submit"
                                    className="
                                        flex items-center justify-center
                                        w-6 h-6 sm:w-9 sm:h-9
                                        rounded-full
                                        bg-gradient-to-r from-blue-500 to-indigo-600
                                        text-white
                                        hover:scale-105
                                        transition-all duration-300
                                        text-[10px] sm:text-base
                                    "
                                >
                                    🔍
                                </button>
                            </Link>
                        </form>
                    </div>

                    {/* User */}
                    <div className="relative group shrink-0">
                        <UserButton user={user} />
                    </div>

                    {/* Cart */}
                    <div className="relative shrink-0">
                        <Link href="/roles/customer_system/cart">
                            <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors relative">
                                <ShoppingBag className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                                <span className="absolute -top-1 -right-1 sm:-top-1 sm:-right-1 bg-blue-600 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                                    {quantity}
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className='relative shrink-0 md:hidden'>
                        <button onClick={() => setMenuopen(!menuOpen)} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-700">
                            {menuOpen ? <X className="w-6 h-6 sm:w-[28px] sm:h-[28px]" /> : <Menu className="w-6 h-6 sm:w-[28px] sm:h-[28px]" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
                    <div className="container mx-auto px-4 py-3 space-y-3">
                        <Link
                            href="/roles/customer_system"
                            className="block py-2 font-medium"
                            onClick={() => setMenuopen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="block py-2 font-medium"
                            onClick={() => setMenuopen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/new-arrivals"
                            className="block py-2 font-medium"
                            onClick={() => setMenuopen(false)}
                        >
                            New Arrivals
                        </Link>
                        <Link
                            href="/sale"
                            className="block py-2 font-medium"
                            onClick={() => setMenuopen(false)}
                        >
                            Sale
                        </Link>
                        <Link
                            href="/roles/customer_system/dashboard/orders"
                            className="block py-2 font-medium"
                            onClick={() => setMenuopen(false)}
                        >
                            Orders
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
export default Header;