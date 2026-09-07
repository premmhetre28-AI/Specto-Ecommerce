"use client";

import React, { useState } from 'react';
import { Bot, LayoutDashboard, Cpu, Bed, Terminal, Wallet, Menu, X } from "lucide-react";
import Link from 'next/link';

const Sidebar = ({closeSidebar,isOpen}) => {
    return (
        <>

            {/* Sidebar Component */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-72 bg-slate-900 border-r border-slate-800 flex flex-col 
                transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 lg:flex lg:mt-[72px]
            `}>
                
                <div className="p-8 relative">
                    {/* Mobile Close Button inside the Sidebar */}
                    <button 
                        onClick={closeSidebar}
                        className="lg:hidden absolute top-6 right-6 p-2 bg-slate-800/50 rounded-full text-gray-400 hover:text-white hover:bg-slate-800 transition-all"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/50">
                            <Bot className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl text-purple-400">
                                Stock Mgmt
                            </h1>
                            <p className="text-xs text-gray-500 font-medium tracking-wide">V 2.0.4 Stable</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-6 space-y-3 overflow-y-auto pb-8 custom-scrollbar">
                    <Link href="/roles/vendor_system/dashboard" onClick={closeSidebar} className="block">
                        <button className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-purple-600/10 rounded-xl hover:text-purple-400 w-full transition-all group">
                            <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Dashboard</span>
                        </button>
                    </Link>

                    <Link href="/roles/vendor_system/dashboard/inventory" onClick={closeSidebar} className="block">
                        <button className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-purple-600/10 rounded-xl hover:text-purple-400 w-full transition-all group">
                            <Cpu size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Inventory</span>
                        </button>
                    </Link>

                    <Link href="/roles/vendor_system/dashboard/occupancy" onClick={closeSidebar} className="block">
                        <button className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-purple-600/10 rounded-xl hover:text-purple-400 w-full transition-all group">
                            <Bed size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Live Occupancy</span>
                        </button>
                    </Link>

                    <Link href="/roles/vendor_system/dashboard/topSelling" onClick={closeSidebar} className="block">
                        <button className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-purple-600/10 rounded-xl hover:text-purple-400 w-full transition-all group">
                            <Terminal size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Top Selling Products</span>
                        </button>
                    </Link>

                    <Link href="/roles/vendor_system/dashboard/finantial_analytics" onClick={closeSidebar} className="block">
                        <button className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-purple-600/10 rounded-xl hover:text-purple-400 w-full transition-all group">
                            <Wallet size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Financial Analytics</span>
                        </button>
                    </Link>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;