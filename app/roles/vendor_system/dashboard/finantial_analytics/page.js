"use client"
import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { finantial_analytics, alertSupplier } from '@/app/redux/slices/productSlice'
import ChartsSectionProfit from '@/app/roles/vendor_system/dashboard/components/ChartsSectionProfit'
import SidebarButton from '../components/SidebarButton'

const page = () => {
    const dispatch = useDispatch()
    const [getalertSupplier, setGetalertSupplier] = useState([])
    const { financial_analytics } = useSelector(
        (state) => state.product
    );
    const data = financial_analytics?.[0] || {}

    let totalRevenue = data?.totalRevenue || 0;
    let totalSales = data?.totalSales || 0;
    let totalCost = data?.totalCost || 0;
    let grossProfit = totalRevenue - totalCost;
    let totalLoss = data?.totalLoss || 0;
    let netProfit = grossProfit - totalLoss;
    let profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(2) : 0;

    const FINANCIAL_ANALYTICS = {
        metrics: [
            {
                label: "Total Revenue",
                value: `₹${totalRevenue.toLocaleString()}`,
                icon: "badge-indian-rupee",
                color: "bg-emerald-500",
                trend: `${totalSales} units sold`
            },
            {
                label: "Gross Profit",
                value: `₹${grossProfit.toLocaleString()}`,
                icon: "trending-up",
                color: "bg-blue-500",
                trend: `${profitMargin}% profit margin`
            },
            {
                label: "Total Loss",
                value: `₹${totalLoss.toLocaleString()}`,
                icon: "trending-down",
                color: "bg-red-500",
                trend: "Loss from discounted sales"
            },
            {
                label: "Net Profit",
                value: `₹${netProfit.toLocaleString()}`,
                icon: "line-chart",
                color: "bg-purple-500",
                trend: netProfit > 0 ? "Business growing" : "Needs attention"
            }
        ]
    };

    const getAlertSupplier = async () => {
        const result = await dispatch(alertSupplier())
        if (result.payload.success) {
            console.log(result.payload.alertSuppliers)
            setGetalertSupplier(result.payload.alertSuppliers)
        }
    }

    useEffect(() => {
        dispatch(finantial_analytics())
        getAlertSupplier()
    }, [dispatch])

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
            <div className="flex min-h-screen">

                {/* Main Content Area */}
                <main className="flex-1 lg:ml-72 p-4 sm:p-6 md:p-10 min-w-0">

                    {/* Header - Forced into a single row on mobile with truncation */}
                    <header className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12 pt-2 lg:pt-0 w-full">
                        
                        <div className="flex-shrink-0 -ml-2">
                            <SidebarButton />
                        </div>
                        
                        <div className="min-w-0 flex-1">
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold truncate">
                                Financial <span className="text-purple-400">Analytics</span>
                            </h2>
                            <p className="text-gray-400 mt-0.5 sm:mt-1 text-[11px] sm:text-sm lg:text-base truncate">
                                Monitor revenue trends, profit margins, and operational efficiency.
                            </p>
                        </div>

                    </header>

                    {/* Stats Cards - Adjusted breakpoints and added truncation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 w-full">
                        {FINANCIAL_ANALYTICS.metrics.map((item) => (
                            <div
                                key={item.label}
                                className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-800 min-w-0 flex flex-col justify-center"
                            >
                                <h4 className="text-gray-400 text-xs sm:text-sm truncate pr-2">{item.label}</h4>
                                <p className="text-2xl sm:text-3xl font-bold mt-2 truncate">{item.value}</p>
                                <span className={`text-[10px] sm:text-xs block mt-1 truncate ${item.label === "Total Loss" ? "text-red-400" : "text-green-400"}`}>
                                    {item.trend}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Profit Chart */}
                    <ChartsSectionProfit />

                    {/* Payment pending alerts Table */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 mt-6 sm:mt-8 overflow-hidden">

                        {/* Table Header */}
                        <div className="p-4 sm:p-6 border-b border-slate-800">
                            <h3 className="text-lg sm:text-xl font-semibold text-white">
                                Payment Alerts
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                Products requiring immediate attention
                            </p>
                        </div>

                        {/* Responsive Table Wrapper */}
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full min-w-[650px] text-center">
                                <thead className="bg-slate-800/50 text-gray-400 text-xs sm:text-sm">
                                    <tr>
                                        <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Product Name</th>
                                        <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Supplier</th>
                                        <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Total Amount</th>
                                        <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Paid Amount</th>
                                        <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Due Amount</th>
                                        <th className="px-4 py-3 sm:py-4 whitespace-nowrap">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="text-sm">
                                    {getalertSupplier.map((item) => (
                                        <tr
                                            key={item._id}
                                            className="border-t border-slate-800/50 hover:bg-slate-800/40 transition-colors"
                                        >
                                            <td className="px-4 py-3 sm:py-4 text-white font-medium whitespace-nowrap">
                                                {item.productName}
                                            </td>
                                            <td className="px-4 py-3 sm:py-4 text-gray-300 whitespace-nowrap">
                                                {item.name}
                                            </td>
                                            <td className="px-4 py-3 sm:py-4 text-gray-300 whitespace-nowrap">
                                                ₹ {item.totalAmount}
                                            </td>
                                            <td className="px-4 py-3 sm:py-4 text-gray-300 whitespace-nowrap">
                                                {item.paidAmount == null ? "—" : `₹ ${item.paidAmount}`}
                                            </td>
                                            <td className="px-4 py-3 sm:py-4 text-gray-300 whitespace-nowrap">
                                                {item.dueAmount === 0 ? (
                                                    <span className="text-green-400 font-medium">₹ 0</span>
                                                ) : (
                                                    <span className="text-yellow-400 font-medium">₹ {item.dueAmount}</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 sm:py-4 whitespace-nowrap">
                                                {item.paymentStatus === "Pending" && (
                                                    <span className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/20">
                                                        Pending
                                                    </span>
                                                )}
                                                {item.paymentStatus === "Partial" && (
                                                    <span className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">
                                                        Partial
                                                    </span>
                                                )}
                                                {item.paymentStatus === "Paid" && (
                                                    <span className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/20">
                                                        Paid
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
    )
}

export default page