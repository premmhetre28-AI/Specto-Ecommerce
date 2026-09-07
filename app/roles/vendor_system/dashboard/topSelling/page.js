"use client"
import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Top_Product } from '@/app/redux/slices/productSlice'
import SidebarButton from '../components/SidebarButton'

const page = () => {
    const dispatch = useDispatch()
    const { top_products } = useSelector((state) => {
        return state.product
    })
    
    useEffect(() => {
        dispatch(Top_Product())
    }, [dispatch])

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
            <div className="flex min-h-screen">

                {/* Main Content Area */}
                <main className="flex-1 lg:ml-72 p-4 sm:p-6 md:p-10 min-w-0">
                    
                    {/* Header - Forced into a single row on mobile with truncation */}
                    <div className='flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12 pt-2 lg:pt-0 w-full'>
                        <div className="flex-shrink-0 -ml-2">
                            <SidebarButton />
                        </div>
                        
                        <div className="min-w-0 flex-1">
                            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-wide truncate">
                                Top Rated <span className="hidden sm:inline">||</span> <span className="text-purple-400">Selling Products</span>
                            </h1>
                            <p className="text-gray-400 mt-1 sm:mt-2 text-[11px] sm:text-sm lg:text-base truncate">
                                Track product stock, monitor sales activity, analyze inventory movement, and manage updates in real time.
                            </p>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 w-full">
                        {top_products?.map((product, index) => (
                            <div
                                key={product._id}
                                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full min-w-0"
                            >
                                <div>
                                    {/* Card Header */}
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <h2 title={product.productName} className="text-base sm:text-lg font-semibold text-gray-800 truncate cursor-pointer">
                                                {product.productName.length > 15 ? `${product.productName.slice(0, 14)} ...` : product.productName}
                                            </h2>

                                            <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                                                {product.category}
                                            </p>
                                        </div>

                                        {/* Rank badge */}
                                        <div className="flex-shrink-0 bg-yellow-100 text-yellow-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                                            #{index + 1}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t my-3 sm:my-4 border-gray-100"></div>

                                    {/* Stats */}
                                    <div className="space-y-2.5 sm:space-y-3">

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 text-xs sm:text-sm">Units Sold</span>
                                            <span className="font-semibold text-gray-800 text-sm">
                                                {product.totalSold}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 text-xs sm:text-sm">Selling Price</span>
                                            <span className="font-semibold text-gray-800 text-sm">
                                                ₹{product.selling_price}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 text-xs sm:text-sm">Revenue</span>
                                            <span className="font-bold text-green-600 text-sm">
                                                ₹{product.totalRevenue.toLocaleString()}
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                {/* Footer badge */}
                                <div className="mt-4 sm:mt-5">
                                    <span className="inline-block bg-blue-50 text-blue-600 text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full font-medium">
                                        Top Selling Product
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                </main>
            </div>
        </div>
    )
}

export default page