"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { fetchTrendingProducts } from "@/app/redux/slices/customerSlice";
import { useDispatch } from "react-redux";

const Home = () => {
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();
    
    useEffect(() => {
        async function trending() {
            const res = await dispatch(fetchTrendingProducts());
            if(res?.payload?.length > 0) {
                setProduct(res.payload[0]);
            }
        }
        trending();
    }, [dispatch]);

    return (
        <>
            <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">

                {/* Background Effects */}
                <div className="absolute top-10 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-blue-300/20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-10 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-300/20 blur-3xl rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-24">

                    <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-center">

                        {/* LEFT SIDE */}
                        <div className="space-y-6 sm:space-y-8 text-center lg:text-left mt-6 lg:mt-0">

                            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-indigo-100 text-indigo-600 font-medium text-xs sm:text-sm">
                                ✨ Summer Collection 2026
                            </span>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                                Wear The <span className="text-indigo-600">Future</span> <br className="hidden sm:block" />
                                Of Fashion
                            </h1>

                            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
                                Premium quality clothing designed for modern lifestyle.
                                Upgrade your wardrobe with exclusive fashion collections.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
                                <Link
                                    href="/shop"
                                    className="px-6 py-3.5 sm:px-8 sm:py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-xl text-sm sm:text-base w-full sm:w-auto"
                                >
                                    Shop Now →
                                </Link>

                                <Link
                                    href="/collections"
                                    className="px-6 py-3.5 sm:px-8 sm:py-4 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all text-sm sm:text-base w-full sm:w-auto"
                                >
                                    Explore Collection
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 sm:pt-8 text-center lg:text-left">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold">10K+</h3>
                                    <p className="text-gray-500 text-xs sm:text-sm">Customers</p>
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold">800+</h3>
                                    <p className="text-gray-500 text-xs sm:text-sm">Products</p>
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold">4.9★</h3>
                                    <p className="text-gray-500 text-xs sm:text-sm">Ratings</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="relative flex justify-center mt-8 lg:mt-0">

                            {/* Floating Card Top */}
                            <div className="absolute top-4 sm:top-8 -left-2 sm:-left-2 md:left-10 bg-white shadow-xl rounded-xl sm:rounded-2xl p-2 sm:p-4 z-20 backdrop-blur-md scale-[0.8] sm:scale-100 origin-top-left">
                                <p className="font-semibold text-xs sm:text-sm md:text-base">
                                    🔥 Trending Product
                                </p>
                                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                                    New Arrival Collection
                                </p>
                            </div>

                            {/* Main Image */}
                            <div className="relative group w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg">
                                <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl blur-2xl"></div>
                                
                                <img
                                    src={product?.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"} // Fallback while loading
                                    alt="Trending Product"
                                    className="relative w-full h-auto aspect-[4/5] object-cover rounded-2xl sm:rounded-3xl drop-shadow-2xl group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* Bottom Floating Card */}
                            <div className="absolute bottom-4 sm:bottom-6 right-0 sm:right-0 md:right-8 bg-white shadow-xl rounded-xl sm:rounded-2xl p-2.5 sm:p-4 z-20 scale-[0.85] sm:scale-100 origin-bottom-right">
                                <p className="font-semibold text-sm sm:text-base">₹ {product?.selling_price || "..."}</p>
                                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Limited Edition</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Shop by category */}
            <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Heading */}
                    <div className="text-center mb-8 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            Shop by Category
                        </h2>
                        <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg px-4">
                            Explore premium collections curated for every style.
                        </p>
                    </div>

                    {/* Category Grid - Made 2 cols on mobile */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">

                        {/* Women */}
                        <Link href="customer_system/products/womenProducts" className="group">
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
                                    alt="Women Collection"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3 sm:p-5 md:p-6">
                                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
                                        Women
                                    </h3>
                                    <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm mt-1 flex items-center">
                                        Explore <span className="hidden sm:inline">&nbsp;Collection</span> &nbsp;→
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Men */}
                        <Link href="customer_system/products/menProducts" className="group">
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
                                    alt="Men Collection"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3 sm:p-5 md:p-6">
                                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
                                        Men
                                    </h3>
                                    <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm mt-1 flex items-center">
                                        Explore <span className="hidden sm:inline">&nbsp;Collection</span> &nbsp;→
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Accessories */}
                        <Link href="#" className="group">
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3"
                                    alt="Accessories Collection"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3 sm:p-5 md:p-6">
                                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
                                        Accessories
                                    </h3>
                                    <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm mt-1 flex items-center">
                                        Explore <span className="hidden sm:inline">&nbsp;Collection</span> &nbsp;→
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Footwear */}
                        <Link href="#" className="group">
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                                    alt="Footwear Collection"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3 sm:p-5 md:p-6">
                                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
                                        Footwear
                                    </h3>
                                    <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm mt-1 flex items-center">
                                        Explore <span className="hidden sm:inline">&nbsp;Collection</span> &nbsp;→
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Laptops */}
                        <Link href="customer_system/products/laptopProducts" className="group">
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
                                    alt="Laptops"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3 sm:p-5 md:p-6">
                                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
                                        Laptops
                                    </h3>
                                    <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm mt-1 flex items-center">
                                        Explore <span className="hidden sm:inline">&nbsp;Collection</span> &nbsp;→
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Smartphones */}
                        <Link href="customer_system/products/smartPhones" className="group">
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                                    alt="Smartphones"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3 sm:p-5 md:p-6">
                                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
                                        Smartphones
                                    </h3>
                                    <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm mt-1 flex items-center">
                                        Explore <span className="hidden sm:inline">&nbsp;Collection</span> &nbsp;→
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Headphones */}
                        <Link href="customer_system/products/headphonesProducts" className="group">
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                                    alt="Headphones"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3 sm:p-5 md:p-6">
                                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
                                        Headphones
                                    </h3>
                                    <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm mt-1 flex items-center">
                                        Explore <span className="hidden sm:inline">&nbsp;Collection</span> &nbsp;→
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Smart Watches */}
                        <Link href="customer_system/products/watchProducts" className="group">
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg aspect-[3/4] cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                                    alt="Smart Watches"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3 sm:p-5 md:p-6">
                                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
                                        Watches
                                    </h3>
                                    <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm mt-1 flex items-center">
                                        Explore <span className="hidden sm:inline">&nbsp;Collection</span> &nbsp;→
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center mt-10 px-4">
                    <Link
                        href="/roles/customer_system/products/allProducts"
                        className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg
                        bg-gradient-to-r from-purple-600 to-pink-600
                        text-white font-medium text-sm sm:text-base
                        hover:shadow-2xl hover:scale-105
                        transition-all duration-300 w-full sm:w-auto text-center"
                    >
                        View All Products
                    </Link>
                </div>
            </section>

            {/* Follow us on instagram */}
            <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Heading */}
                    <div className="text-center mb-8 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            Follow Us on Instagram
                        </h2>
                        <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">
                            Daily fashion inspiration & latest trends
                        </p>
                        <p className="mt-1 sm:mt-2 text-pink-600 font-semibold cursor-pointer hover:underline text-sm sm:text-base">
                            @shopease_official
                        </p>
                    </div>

                    {/* Instagram Grid - Made 3 cols on mobile for true IG feel */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 md:gap-5">

                        {[
                            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
                            "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
                            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
                            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                            "https://images.unsplash.com/photo-1483985988355-763728e1935b",
                            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518"
                        ].map((img, idx) => (
                            <a key={idx} href="#" className="group relative overflow-hidden rounded-xl sm:rounded-2xl">
                                <img
                                    src={img}
                                    alt="Instagram Post"
                                    className="w-full aspect-square object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 text-xs sm:text-lg font-medium transition duration-500">
                                        ❤ View
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="text-center mt-8 sm:mt-10 px-4">
                        <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition duration-300">
                            Follow on Instagram
                        </button>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-12 sm:pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Main Footer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">

                        {/* Brand Section */}
                        <div className="sm:col-span-2 text-center sm:text-left">
                            <a
                                href="#"
                                className="text-2xl sm:text-3xl font-bold text-white inline-block mb-3 sm:mb-4"
                            >
                                ShopEase
                            </a>

                            <p className="text-gray-300 leading-6 sm:leading-7 max-w-md mx-auto sm:mx-0 mb-5 sm:mb-6 text-sm sm:text-base">
                                Premium quality fashion for men and women. We focus on sustainable,
                                stylish, and long-lasting products crafted for modern lifestyles.
                            </p>

                            {/* Social Icons */}
                            <div className="flex justify-center sm:justify-start gap-3 sm:gap-4">
                                <a className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                                    <FaFacebookF size={18} />
                                </a>
                                <a className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                                    <FaInstagram size={18} />
                                </a>
                                <a className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                                    <RiTwitterXFill size={18} />
                                </a>
                                <a className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                                    <FaPinterestP size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Footer Links - Grid to sit nicely next to each other on mobile */}
                        <div className="grid grid-cols-2 sm:grid-cols-1 col-span-1 gap-8 sm:gap-0 sm:col-span-1">
                            <div>
                                <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-5 text-white">Shop</h3>
                                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">Women</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">Men</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">Accessories</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">Footwear</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">New Arrivals</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">Sale</a></li>
                                </ul>
                            </div>
                            
                            {/* Help on mobile sits beside Shop */}
                            <div className="sm:mt-8 lg:mt-0">
                                <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-5 text-white">Help</h3>
                                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">Customer Service</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">My Account</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">Find Store</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">Shipping</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* About */}
                        <div className="col-span-1 text-center sm:text-left mt-4 sm:mt-0">
                            <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-5 text-white">About</h3>
                            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Sustainability</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Press</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-gray-700">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">

                            <p className="text-gray-400 text-xs sm:text-sm text-center lg:text-left order-3 lg:order-1">
                                © 2026 ShopEase. All rights reserved.
                            </p>

                            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 text-xs sm:text-sm order-1 lg:order-2">
                                <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                                <span className="text-gray-600 hidden sm:inline">|</span>
                                <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                                <span className="text-gray-600 hidden sm:inline">|</span>
                                <a href="#" className="text-gray-400 hover:text-white transition">Cookie Settings</a>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4 text-xl sm:text-2xl text-gray-400 order-2 lg:order-3">
                                <i className="ri-visa-fill hover:text-white cursor-pointer transition"></i>
                                <i className="ri-mastercard-fill hover:text-white cursor-pointer transition"></i>
                                <i className="ri-paypal-fill hover:text-white cursor-pointer transition"></i>
                                <i className="ri-apple-fill hover:text-white cursor-pointer transition"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Home;