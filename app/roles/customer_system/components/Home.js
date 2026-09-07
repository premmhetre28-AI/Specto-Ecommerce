"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { fetchTrendingProducts } from "@/app/redux/slices/customerSlice";
import { useDispatch } from "react-redux";

const Home = () => {
    const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        async function trending() {
            const res = await dispatch(fetchTrendingProducts())
            setProduct(res.payload[0])
        }
        trending()
    }, [dispatch])
    console.log(product)
    return (
        <>
            <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">

                {/* Background Effects */}
                <div className="absolute top-10 left-0 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-300/20 blur-3xl rounded-full"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-24">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        {/* LEFT SIDE */}
                        <div className="space-y-8 text-center lg:text-left">

                            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 font-medium text-sm">
                                ✨ Summer Collection 2026
                            </span>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                                Wear The <span className="text-indigo-600">Future</span> <br />
                                Of Fashion
                            </h1>

                            <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
                                Premium quality clothing designed for modern lifestyle.
                                Upgrade your wardrobe with exclusive fashion collections.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

                                <Link
                                    href="/shop"
                                    className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-xl"
                                >
                                    Shop Now →
                                </Link>

                                <Link
                                    href="/collections"
                                    className="px-8 py-4 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                                >
                                    Explore Collection
                                </Link>

                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 pt-8 text-center lg:text-left">

                                <div>
                                    <h3 className="text-2xl font-bold">10K+</h3>
                                    <p className="text-gray-500 text-sm">Customers</p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold">800+</h3>
                                    <p className="text-gray-500 text-sm">Products</p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold">4.9★</h3>
                                    <p className="text-gray-500 text-sm">Ratings</p>
                                </div>

                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="relative flex justify-center">

                            {/* Floating Card */}
                            <div className="absolute top-8 -left-2 md:left-10 bg-white shadow-xl rounded-2xl p-4 z-20 backdrop-blur-md">
                                <p className="font-semibold text-sm md:text-base">
                                    🔥 Trending Product
                                </p>
                                <p className="text-xs text-gray-500">
                                    New Arrival Collection
                                </p>
                            </div>

                            {/* Main Image */}
                            <div className="relative group">

                                <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl blur-2xl"></div>

                                
                                <img
                                    src= {product.image}
                                    alt=""
                                    width={550}
                                    height={650}
                                    className="relative rounded-3xl object-cover drop-shadow-2xl group-hover:scale-105 transition duration-500"
                                />
                                
                            </div>

                            {/* Bottom Floating Card */}
                            <div className="absolute bottom-6 right-0 md:right-8 bg-white shadow-xl rounded-2xl p-4 z-20">
                                <p className="font-semibold">₹ {product.selling_price}</p>
                                <p className="text-xs text-gray-500">Limited Edition</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {/* Shop by category */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Heading */}
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Shop by Category
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm sm:text-base md:text-lg">
                            Explore premium collections curated for every style.
                        </p>
                    </div>

                    {/* Category Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Women */}
                        <Link href="customer_system/products/womenProducts" className="group">
                            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
                                    alt="Women Collection"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                                        Women
                                    </h3>
                                    <p className="text-gray-200 text-sm mt-1">
                                        Explore Collection →
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Men */}
                        <Link href="customer_system/products/menProducts" className="group">
                            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
                                    alt="Men Collection"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                                        Men
                                    </h3>
                                    <p className="text-gray-200 text-sm mt-1">
                                        Explore Collection →
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Accessories */}
                        <Link href="#" className="group">
                            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3"
                                    alt="Accessories Collection"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                                        Accessories
                                    </h3>
                                    <p className="text-gray-200 text-sm mt-1">
                                        Explore Collection →
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Footwear */}
                        <Link href="#" className="group">
                            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                                    alt="Footwear Collection"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                                        Footwear
                                    </h3>
                                    <p className="text-gray-200 text-sm mt-1">
                                        Explore Collection →
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Laptops */}
                        <Link href="customer_system/products/laptopProducts" className="group">
                            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
                                    alt="Laptops"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-5">
                                    <h3 className="text-2xl font-bold text-white">
                                        Laptops
                                    </h3>
                                    <p className="text-gray-200 text-sm mt-1">
                                        Explore Collection →
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Smartphones */}
                        <Link href="customer_system/products/smartPhones" className="group">
                            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                                    alt="Smartphones"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-5">
                                    <h3 className="text-2xl font-bold text-white">
                                        Smartphones
                                    </h3>
                                    <p className="text-gray-200 text-sm mt-1">
                                        Explore Collection →
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Headphones */}
                        <Link href="customer_system/products/headphonesProducts" className="group">
                            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                                    alt="Headphones"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-5">
                                    <h3 className="text-2xl font-bold text-white">
                                        Headphones
                                    </h3>
                                    <p className="text-gray-200 text-sm mt-1">
                                        Explore Collection →
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Smart Watches */}
                        <Link href="customer_system/products/watchProducts" className="group">
                            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                                    alt="Smart Watches"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-5">
                                    <h3 className="text-2xl font-bold text-white">
                                        Smart Watches
                                    </h3>
                                    <p className="text-gray-200 text-sm mt-1">
                                        Explore Collection →
                                    </p>
                                </div>
                            </div>
                        </Link>


                    </div>
                </div>
            </section>
            <div className="flex justify-center mt-10">
                <Link
                    href="/roles/customer_system/products/allProducts"
                    className="px-7 py-3 rounded-lg
                    bg-gradient-to-r from-purple-600 to-pink-600
                    text-white font-medium
                    hover:shadow-2xl hover:scale-105
                    transition-all duration-300"
                >
                    View All Products
                </Link>
            </div>
            {/* Follow us on instagram */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Heading */}
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Follow Us on Instagram
                        </h2>

                        <p className="text-gray-500 mt-3 text-sm sm:text-base md:text-lg">
                            Daily fashion inspiration & latest trends
                        </p>

                        <p className="mt-2 text-pink-600 font-semibold cursor-pointer hover:underline">
                            @shopease_official
                        </p>
                    </div>

                    {/* Instagram Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">

                        {/* Card 1 */}
                        <a href="#" className="group relative overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
                                alt="Instagram Post"
                                className="w-full aspect-square object-cover transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-lg font-medium transition duration-500">
                                    ❤ View
                                </span>
                            </div>
                        </a>

                        {/* Card 2 */}
                        <a href="#" className="group relative overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3"
                                alt="Instagram Post"
                                className="w-full aspect-square object-cover transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-lg font-medium transition duration-500">
                                    ❤ View
                                </span>
                            </div>
                        </a>

                        {/* Card 3 */}
                        <a href="#" className="group relative overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
                                alt="Instagram Post"
                                className="w-full aspect-square object-cover transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-lg font-medium transition duration-500">
                                    ❤ View
                                </span>
                            </div>
                        </a>

                        {/* Card 4 */}
                        <a href="#" className="group relative overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                                alt="Instagram Post"
                                className="w-full aspect-square object-cover transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-lg font-medium transition duration-500">
                                    ❤ View
                                </span>
                            </div>
                        </a>

                        {/* Card 5 */}
                        <a href="#" className="group relative overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                                alt="Instagram Post"
                                className="w-full aspect-square object-cover transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-lg font-medium transition duration-500">
                                    ❤ View
                                </span>
                            </div>
                        </a>

                        {/* Card 6 */}
                        <a href="#" className="group relative overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518"
                                alt="Instagram Post"
                                className="w-full aspect-square object-cover transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-lg font-medium transition duration-500">
                                    ❤ View
                                </span>
                            </div>
                        </a>

                    </div>

                    {/* CTA Button */}
                    <div className="text-center mt-10">
                        <button className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition duration-300">
                            Follow on Instagram
                        </button>
                    </div>

                </div>
            </section>
            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Main Footer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

                        {/* Brand Section */}
                        <div className="sm:col-span-2">
                            <a
                                href="#"
                                className="text-3xl font-bold text-white inline-block mb-4"
                            >
                                ShopEase
                            </a>

                            <p className="text-gray-300 leading-7 max-w-md mb-6 text-sm sm:text-base">
                                Premium quality fashion for men and women. We focus on sustainable,
                                stylish, and long-lasting products crafted for modern lifestyles.
                            </p>

                            {/* Social Icons */}
                            <div className="flex gap-4">

                                <a className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                                    <FaFacebookF />
                                </a>

                                <a className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                                    <FaInstagram />
                                </a>

                                <a className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                                    <RiTwitterXFill />
                                </a>

                                <a className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                                    <FaPinterestP />
                                </a>

                            </div>
                        </div>

                        {/* Shop */}
                        <div>
                            <h3 className="font-semibold text-lg mb-5 text-white">Shop</h3>
                            <ul className="space-y-3 text-sm sm:text-base">
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Women</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Men</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Accessories</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Footwear</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">New Arrivals</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Sale</a></li>
                            </ul>
                        </div>

                        {/* Help */}
                        <div>
                            <h3 className="font-semibold text-lg mb-5 text-white">Help</h3>
                            <ul className="space-y-3 text-sm sm:text-base">
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Customer Service</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">My Account</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Find Store</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Shipping & Returns</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">FAQs</a></li>
                            </ul>
                        </div>

                        {/* About */}
                        <div>
                            <h3 className="font-semibold text-lg mb-5 text-white">About</h3>
                            <ul className="space-y-3 text-sm sm:text-base">
                                <li><a href="#" className="text-gray-300 hover:text-white transition">About Us</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Sustainability</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Careers</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Press</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="mt-14 pt-8 border-t border-gray-700">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

                            <p className="text-gray-400 text-sm text-center lg:text-left">
                                © 2026 ShopEase. All rights reserved.
                            </p>

                            <div className="flex flex-wrap justify-center gap-5 text-sm">
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Privacy Policy
                                </a>

                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Terms of Service
                                </a>

                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Cookie Settings
                                </a>
                            </div>

                            <div className="flex items-center gap-4 text-2xl text-gray-300">
                                <i className="ri-visa-fill"></i>
                                <i className="ri-mastercard-fill"></i>
                                <i className="ri-paypal-fill"></i>
                                <i className="ri-apple-fill"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}

export default Home