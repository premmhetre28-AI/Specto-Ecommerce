"use client"
import {React,useState} from 'react'
import { RefreshCw, Menu } from "lucide-react";
import Sidebar from './Sidebar';
const SidebarButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);
    return (
        <div>
            {!isOpen && (
                <button
                    onClick={toggleSidebar}
                    // flex-shrink-0 prevents the button from squishing, slightly smaller on mobile (w-10 h-10)
                    className="lg:hidden ml-2 p-2 flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 text-white rounded-full shadow-xl hover:bg-purple-700 active:scale-95 transition-all"
                >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            )}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={closeSidebar}
                />
            )}
            <Sidebar toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} isOpen={isOpen}  />
        </div>
    )
}

export default SidebarButton
