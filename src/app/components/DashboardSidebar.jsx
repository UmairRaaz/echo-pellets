'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FaTree, FaTachometerAlt, FaPlus, FaBoxes, FaShoppingCart, FaLifeRing, FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DashboardSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`h-screen fixed left-0 top-0 bg-white text-black ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col shadow-lg`}>
            <div className="py-4 px-6 flex justify-between items-center">
                <Link href="/" className={`flex justify-center items-center ${isOpen ? 'md:flex' : 'md:hidden'} py-2.5  hover:text-black`}>
                    <FaTree className="w-6 h-6 mr-3" style={{ color: 'green' }} />
                    <span className={`text-xl text-nowrap font-bold transition-all duration-300 ${!isOpen && 'hidden'}`}>Echo Pellets</span>
                </Link>
                <button onClick={toggleSidebar} className="text-black focus:outline-none">
                    {isOpen ? (
                        <FaChevronLeft className="w-6 h-6" />
                    ) : (
                        <FaChevronRight className="w-6 h-6" />
                    )}
                </button>
            </div>
            <nav className="flex flex-col flex-1 px-2 space-y-2 gap-3">
                <Link href="/admin" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
                    <FaTachometerAlt className="w-6 h-6 mr-3" style={{ color: '#FF5722' }} />
                    <span className={`transition-all duration-300 ${!isOpen && 'hidden'}`}>Dashboard</span>
                </Link>
                <Link href="/admin/add-product" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
                    <FaPlus className="w-6 h-6 mr-3" style={{ color: '#FFC107' }} />
                    <span className={`transition-all duration-300 ${!isOpen && 'hidden'}`}>Add Product</span>
                </Link>
                <Link href="/admin/all-products" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
                    <FaBoxes className="w-6 h-6 mr-3" style={{ color: '#2196F3' }} />
                    <span className={`transition-all duration-300 ${!isOpen && 'hidden'}`}>All Products</span>
                </Link>
                <Link href="/admin/all-orders" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
                    <FaShoppingCart className="w-6 h-6 mr-3" style={{ color: '#E91E63' }} />
                    <span className={`transition-all duration-300 ${!isOpen && 'hidden'}`}>All Orders</span>
                </Link>
                <Link href="/admin/all-supports" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
                    <FaLifeRing className="w-6 h-6 mr-3" style={{ color: '#FF5722' }} />
                    <span className={`transition-all duration-300 ${!isOpen && 'hidden'}`}>All Support</span>
                </Link>
                <Link href="/admin/all-users" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
                    <FaUsers className="w-6 h-6 mr-3" style={{ color: '#9C27B0' }} />
                    <span className={`transition-all duration-300 ${!isOpen && 'hidden'}`}>All Users</span>
                </Link>
            </nav>
        </div>
    );
};

export default DashboardSidebar;

