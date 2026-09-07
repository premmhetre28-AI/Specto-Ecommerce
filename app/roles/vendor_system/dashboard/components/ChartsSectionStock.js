"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockOutHistory, getChart } from "@/app/redux/slices/productSlice";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const ChartsSectionStock = () => {
    const dispatch = useDispatch()
    const { chartData } = useSelector(
        (state) => state.product
    );
    const [filter, setFilter] = useState("weekly")

    const graphData = chartData.map((item) => {
        let label;
        if (filter === "daily") {
            label = new Date(item._id).toLocaleTimeString();
        } else if (filter === "weekly") {
            label = new Date(item._id).toLocaleDateString("en-US", {
                weekday: "short"
            });
        } else if (filter === "monthly") {
            label = new Date(item._id).toLocaleDateString("en-US", {
                day: "numeric"
            })
        } else {
            label = new Date(item._id).toLocaleDateString("en-US", {
                month: "short"
            });
        }
        return {
            name: label,
            sales: item.totalStockOut,
            in:item.totalStockIn
        };
    })
    useEffect(() => {
        dispatch(stockOutHistory())
        dispatch(getChart(filter))
    }, [filter])
    return (
        <div>
            {/* Chart Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10">

                {/* Chart Section */}
                <div className="xl:col-span-2 bg-slate-900/80 backdrop-blur-xl 
                                        border border-slate-800 rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-white">
                                Inventory Movement
                            </h3>
                            <p className="text-sm text-slate-400 mt-1">
                                Track stock inflow & sales performance
                            </p>
                        </div>

                        {/* Filter */}
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="
                                    bg-[#0f172a]
                                    border border-slate-700
                                    rounded-lg
                                    px-4 py-2
                                    text-slate-200
                                    text-sm
                                    font-medium
                                    
                                    hover:bg-slate-800
                                    hover:border-slate-500
                                    
                                    focus:outline-none
                                    focus:ring-1
                                    focus:ring-blue-500
                                    
                                    transition-all
                                    duration-200
                                "
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>

                    </div>

                    {/* Legend */}
                    <div className="flex gap-6 mb-4">

                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span className="text-sm text-slate-400">Sales</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-sky-300"></div>
                            <span className="text-sm text-slate-400">In</span>
                        </div>

                    </div>

                    {/* Chart */}
                    <div className="w-full h-[250px] sm:h-[330px] md:h-[400px]">
                        {graphData?.length > 0 ?
                            (<ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={graphData}
                                    margin={{
                                        top: 10,
                                        right: 20,
                                        left: -10,
                                        bottom: 5,
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="4 4"
                                        stroke="#334155"
                                        opacity={0.4}
                                    />

                                    <XAxis
                                        dataKey="name"
                                        tick={{
                                            fill: "#94A3B8",
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        tickFormatter={(value) => {
                                            if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`
                                            if (value >= 100000) return `${(value / 100000).toFixed(1)}L`
                                            if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                                            return value
                                        }}
                                        tick={{
                                            fill: "#94A3B8",
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0F172A",
                                            border: "1px solid #334155",
                                            borderRadius: "12px",
                                            color: "white",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="in"
                                        stroke="skyblue"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6 }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6 }}
                                    />

                                </LineChart>
                            </ResponsiveContainer>) :
                            (<div className="flex justify-center items-center h-full text-gray-400">
                                No chart data
                            </div>)
                        }

                    </div>

                </div>

                {/* Live Feed */}
                <div className="bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800">

                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                        Live Feed
                    </h3>

                    <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-400">

                        <div className="border-b border-slate-800 pb-2">
                            <p>[23:14]</p>
                            <p className="text-white">Added product stock</p>
                        </div>

                        <div className="border-b border-slate-800 pb-2">
                            <p>[23:15]</p>
                            <p className="text-white">Updated inventory</p>
                        </div>

                        <div className="border-b border-slate-800 pb-2">
                            <p>[23:16]</p>
                            <p className="text-white">Deleted product</p>
                        </div>

                        <div>
                            <p>[23:17]</p>
                            <p className="text-white">Low stock alert</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChartsSectionStock
