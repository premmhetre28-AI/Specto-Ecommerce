"use client"
import * as XLSX from "xlsx";
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stockInOutHistor } from '@/app/redux/slices/productSlice'
import SidebarButton from "../components/SidebarButton";

const Occupancy = () => {
    const dispatch = useDispatch();
    const { stockInOutHistory } = useSelector(
        (state) => state.product
    );
    
    const exportExcel = async () => {
        const data = await dispatch(stockInOutHistor())

        const worksheet = XLSX.utils.json_to_sheet(data.payload.totalinout);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        XLSX.writeFile(workbook, "Products.xlsx");
    }
    
    useEffect(() => {
        dispatch(stockInOutHistor())
    }, [dispatch])

    return (
        <div>
            <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
                <div className="flex min-h-screen">

                    {/* Main Content Area */}
                    <main className="flex-1 lg:ml-72 p-4 sm:p-6 md:p-10 min-w-0">

                        {/* Header and Export Button - Stacks on mobile, inline on desktop */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pt-2 lg:pt-0 w-full">
                            
                            {/* Left Side: Menu + Title */}
                            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                                <div className="flex-shrink-0 -ml-2">
                                    <SidebarButton />
                                </div>
                                
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-wide truncate">
                                        Live <span className="text-purple-400">Occupancy</span>
                                    </h1>
                                    <p className="text-gray-400 mt-0.5 sm:mt-1 text-[11px] sm:text-sm lg:text-base truncate">
                                        Track incoming and outgoing stock activities in real time
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Export Button */}
                            <button
                                onClick={exportExcel}
                                title="Export Excel"
                                className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-md transition duration-300 w-full sm:w-auto"
                            >
                                Export Data
                            </button>
                        </div>

                        {/* Table Container - Updated to match dashboard card style */}
                        <div className="w-full bg-slate-900 rounded-2xl shadow-lg border border-slate-800 overflow-hidden">
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full min-w-[700px] text-center border-collapse">

                                    {/* Header */}
                                    <thead className="bg-slate-800/50 text-gray-400 text-xs sm:text-sm">
                                        <tr>
                                            <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Product</th>
                                            <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Cost Price</th>
                                            <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Quantity</th>
                                            <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Recent Action</th>
                                            <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Updated</th>
                                        </tr>
                                    </thead>

                                    {/* Body */}
                                    <tbody className="text-sm">
                                        {stockInOutHistory?.map((item) =>
                                            <tr 
                                                key={item._id} 
                                                className="border-t border-slate-800/50 hover:bg-slate-800/40 transition-colors"
                                            >
                                                <td className="px-4 py-3 sm:py-4 font-semibold text-white whitespace-nowrap">
                                                    {item.name}
                                                </td>
                                                <td className="px-4 py-3 sm:py-4 text-gray-300 whitespace-nowrap">
                                                    ₹{item.price}
                                                </td>
                                                <td className="px-4 py-3 sm:py-4 text-gray-300 whitespace-nowrap">
                                                    {item.quantity}
                                                </td>

                                                <td className="px-4 py-3 sm:py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-block min-w-[70px] px-2.5 py-1 text-[10px] sm:text-xs rounded-full font-medium border ${
                                                            item.type === "OUT"
                                                                ? "bg-red-500/20 text-red-400 border-red-500/20"
                                                                : "bg-green-500/20 text-green-400 border-green-500/20"
                                                        }`}
                                                    >
                                                        {item.type}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3 sm:py-4 text-gray-300 whitespace-nowrap">
                                                    {new Date(item.createdAt).toLocaleString()}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    )
}

export default Occupancy