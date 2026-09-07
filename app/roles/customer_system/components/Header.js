"use client";
import { useState, useEffect } from 'react'
import Link from "next/link";
import { ShoppingBag, Menu, ChevronDown, X } from "lucide-react";
import { getUser } from '@/app/redux/slices/authSlice'
import UserButton from '@/app/roles/vendor_system/components/UserButton'
import { useDispatch, useSelector } from 'react-redux';
import { Sparkles } from "lucide-react";
import { fetchCart } from "@/app/redux/slices/cartSlice";


const Header = () => {
    const [user, setUser] = useState([])
    const [query, setQuery] = useState('')
    const [menuOpen, setMenuopen] = useState(false)
    const dispatch = useDispatch()
    const { quantity } = useSelector((state) => state.cart)
    useEffect(() => {
        async function fetchUser() {
            const res = await dispatch(getUser());
            if (res.payload.success) {
                setUser(res.payload.user);
            }
            else {
                alert(res.payload.message)
            }
        }
        fetchUser();
        dispatch(fetchCart())
    }, [dispatch])
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/roles/customer_system"
                    className="flex items-center gap-3 group"
                >
                    {/* Logo Icon */}
                    <div
                        className="w-11 h-11 rounded-xl 
                        bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 
                        flex items-center justify-center 
                        shadow-lg group-hover:scale-105 transition duration-300"
                    >
                        <span className="text-white text-2xl font-extrabold italic">
                            S
                        </span>
                    </div>

                    {/* Brand Name */}
                    <div className="flex items-center">
                        <span
                            className="text-2xl font-extrabold 
                            bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                            bg-clip-text text-transparent tracking-tight"
                        >
                            Specto
                        </span>

                        <Sparkles
                            size={18}
                            className="ml-1 text-blue-500 animate-pulse"
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">

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
                <div className="flex items-center space-x-6">

                    {/* Search */}
                    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                            className="
                                flex items-center gap-2
                                bg-slate-900/95 backdrop-blur-md
                                border border-slate-700
                                rounded-full
                                px-3 sm:px-4
                                py-1.5
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
                                placeholder="Search products..."
                                className="
                                flex-1
                                bg-transparent
                                px-2
                                text-sm sm:text-base
                                text-white
                                placeholder-gray-400
                                outline-none
                            "
                            />

                            {/* Search Button */}
                            <Link href={`/roles/customer_system/products/searchedProducts?query=${query}`}>
                            <button
                                type="submit"
                                className="
                                flex items-center justify-center
                                w-9 h-9
                                rounded-full
                                bg-gradient-to-r from-blue-500 to-indigo-600
                                text-white
                                hover:scale-105
                                transition-all duration-300
                            "
                            >
                                🔍
                            </button>
                            </Link>
                        </form>
                    </div>

                    {/* User */}
                    <div className="relative group">
                        <UserButton user={user} />
                    </div>

                    {/* Cart */}
                    <div className="relative">
                        <Link href="/roles/customer_system/cart">
                            <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors relative">

                                <ShoppingBag size={22} />

                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {quantity}
                                </span>

                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className='relative'>
                        <button onClick={() => setMenuopen(!menuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700">
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen &&
                (<div className="md:hidden bg-white border-t border-gray-100">
                    <div className="container mx-auto px-4 py-3 space-y-3">

                        <Link href="/roles/customer_system" className="block py-2 font-medium">
                            Home
                        </Link>

                        <Link href="/shop" className="block py-2 font-medium">
                            Shop
                        </Link>

                        <Link href="/new-arrivals" className="block py-2 font-medium">
                            New Arrivals
                        </Link>

                        <Link href="/sale" className="block py-2 font-medium">
                            Sale
                        </Link>

                        <Link href="/about" className="block py-2 font-medium">
                            About
                        </Link>

                    </div>
                </div>)
            }
        </header>
    );
}
export default Header
