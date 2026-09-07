"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { stockOutHistory, fetchProducts } from "@/app/redux/slices/productSlice";

import ChartsSectionStock from '@/app/roles/vendor_system/dashboard/components/ChartsSectionStock';
import SidebarButton from "./components/SidebarButton";

export default function page() {
  const dispatch = useDispatch()

  const { products } = useSelector(
    (state) => state.product
  );

  const total_products = products?.length || 0;

  const totalStock = products?.reduce(
    (sum, item) => sum + item.stock,
    0
  ) || 0;

  const lowStocks = products?.filter(
    (item) => item.stock < 5 && item.stock > 0
  ).length || 0;

  const outOfStock = products?.filter(
    (item) => item.stock === 0
  ).length || 0;

  const inventoryValue = products?.reduce(
    (sum, item) => sum + (item.price * item.stock),
    0
  ) || 0;

  const alertProducts = products?.filter(
    (item) => item.stock === 0 || item.stock < 5
  ) || [];

  const DASHBOARD_DATA = {
    metrics: [
      {
        label: "Total Products",
        value: total_products,
        icon: "package",
        color: "bg-indigo-500",
        trend: `${totalStock} items available`
      },
      {
        label: "Low Stock",
        value: lowStocks,
        icon: "alert-triangle",
        color: "bg-yellow-500",
        trend: "Need restock"
      },
      {
        label: "Out Of Stock",
        value: outOfStock,
        icon: "x-circle",
        color: "bg-red-500",
        trend: "Unavailable products"
      },
      {
        label: "Inventory Value",
        value: `₹${inventoryValue.toLocaleString()}`,
        icon: "indian-rupee",
        color: "bg-green-500",
        trend: "Total stock worth"
      }
    ]
  };

  useEffect(() => {
    dispatch(stockOutHistory())
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="flex min-h-screen">

        <main className="flex-1 lg:ml-72 p-4 sm:p-6 md:p-10 min-w-0">

          {/* Header - Grouped SidebarButton and Titles together */}
          <header className="flex items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pt-2 lg:pt-0 w-full">
            
            {/* Left Section: Menu Button + Titles */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <div className="flex-shrink-0 -ml-2">
                <SidebarButton />
              </div>

              {/* min-w-0 and truncate force the text to fit the row instead of wrapping */}
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold truncate">
                  System <span className="text-purple-400">Overview</span>
                </h2>

                <p className="text-gray-400 mt-0.5 sm:mt-1 text-[11px] sm:text-sm lg:text-base truncate">
                  AI Agents: 12 Active | Region: Bengaluru
                </p>
              </div>
            </div>

            {/* Right Section: Refresh Button */}
            <button className="flex-shrink-0 p-2 sm:p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
              <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 w-full">
            {DASHBOARD_DATA.metrics.map((item) => (
              <div
                key={item.label}
                className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-800 min-w-0 flex flex-col justify-center"
              >
                <h4 className="text-gray-400 text-xs sm:text-sm truncate pr-2">{item.label}</h4>
                <p className="text-2xl sm:text-3xl font-bold mt-2 truncate">{item.value}</p>
                <span className="text-[10px] sm:text-xs text-green-400 block mt-1 truncate">
                  {item.trend}
                </span>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <ChartsSectionStock />

          {/* Product Table */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 mt-6 sm:mt-8 overflow-hidden">

            <div className="p-4 sm:p-6 border-b border-slate-800">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Stock Alerts
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Products requiring immediate attention
              </p>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-slate-800/50 text-gray-400 text-xs sm:text-sm">
                  <tr>
                    <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Product</th>
                    <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Category</th>
                    <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Stock Left</th>
                    <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Price</th>
                    <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Status</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {alertProducts.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-slate-800/50 hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-4 py-3 sm:py-4 text-white font-medium">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 sm:py-4 text-gray-300">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 sm:py-4 text-gray-300">
                        {item.stock}
                      </td>
                      <td className="px-4 py-3 sm:py-4 text-gray-300">
                        ₹{item.price}
                      </td>
                      <td className="px-4 py-3 sm:py-4">
                        {item.stock === 0 ? (
                          <span className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/20 whitespace-nowrap">
                            Out Of Stock
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 whitespace-nowrap">
                            Low Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}