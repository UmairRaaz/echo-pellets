"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProductContext from "@/context/ProductContext";
import { IoCartSharp } from "react-icons/io5";
import { IoIosHeart, IoIosHome } from "react-icons/io";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";


function NavbarSimple() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userDetails, setuserDetails] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { wishlist, cart } = useContext(ProductContext);

  const getCookies = async () => {
    const response = await axios.get("/api/isAdmin");
    if (response.data.data) {
      setuserDetails(response.data.data)
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    getCookies();
  }, []);

  const logoutHandler = async () => {
    await axios.get("/api/logout");
    router.replace("/");
    window.location.reload(true);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 z-30 w-full">
      <div className="flex-1">
        <span className="btn btn-ghost text-xl">
          <Link href="/">
            <span style={{ color: "green", fontSize: "1.2em" }}>E</span>cho{" "}
            <span style={{ color: "green", fontSize: "1.2em" }}>P</span>ellets
          </Link>
        </span>
      </div>
      <div className="flex-none">
        <div className="hidden lg:flex justify-center w-full">
          <ul className="menu menu-horizontal px-1 flex justify-center">
            <li>
              <Link href="/">
                <IoIosHome size={25} className="text-green-600" />
              </Link>
            </li>
            <li>
              <Link href="/why-us">Why We Are</Link>
            </li>
            <li>
              <Link href="/problems-solutions">Problems & Solution</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/contactus">Contact Us</Link>
            </li>
            <li>
              <Link href="/cart" className="flex items-center">
                <IoCartSharp size={25} />
                <span className="bg-green-600 text-white rounded-full px-[8px] py-[1px]">
                  {cart.length}
                </span>
              </Link>
            </li>
            <li>


              <div className="relative">
                <Image
                  src="/profile.png" // Replace with your default image path
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg" style={{ top: '100%' }}>
                    {isLoggedIn ? (
                      <>
                        <li className=" text-xs  px-2 py-2 border-b">Name: {userDetails.name}</li>
                        <li className=" text-xs font-medium px-2 py-2 border-b">Email: {userDetails.email}</li>
                        <li className="text-xs  py-2 border-b">
                            <a href="/ordercomplete" className="text-green-800 ">View Orders</a>
                        </li>
                        <li className="px-4 py-2">
                          <button
                            onClick={logoutHandler}
                            className=" btn  btn-sm border-black   text-sm"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <li className="px-4 py-2">
                       
                          <a href="/login" className="btn text-sm btn-sm btn-dark border-black">Login</a>
                 
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>

        
        <button className="btn btn-ghost lg:hidden" onClick={toggleSidebar}>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 lg:hidden">
          <div className="fixed inset-y-0 left-0 w-64 bg-base-100 shadow-lg p-4">
            <button className="btn btn-ghost mb-4" onClick={toggleSidebar}>
              <XMarkIcon className="h-6 w-6" />
            </button>
            <ul className="menu flex flex-col">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/why-us">Why We Are</Link>
              </li>
              <li>
                <Link href="/problems-solutions">Problems & Solution</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/contactus">Contact Us</Link>
              </li>

              <li>
                <Link href="/cart" className="flex items-center">
                  <IoCartSharp size={25} />
                  <span className="bg-green-500 text-white rounded-full px-[8px] py-[1px]">
                    {cart.length}
                  </span>
                </Link>

                <div className="relative ">
                <Image
                  src="/profile.png" // Replace with your default image path
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg" style={{ top: '100%' }}>
                    {isLoggedIn ? (
                      <>
                        <li className=" text-xs  px-2 py-2 border-b">Name: {userDetails.name}</li>
                        <li className=" text-xs font-medium px-2 py-2 border-b">Email: {userDetails.email}</li>
                        <li className="text-xs  py-2 border-b">
                            <Link href="/ordercomplete" className="text-green-800 ">View Orders</Link>
                        </li>
                        <li className="px-4 py-2">
                          <button
                            onClick={logoutHandler}
                            className="btn btn-dark btn-sm border-black  text-sm"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <li className="px-4 py-2">
                       
                          <a href="/login" className="btn btn-dark btn-sm border-black">Login</a>
                 
                      </li>
                    )}
                  </ul>
                )}
              </div>


              </li>


             
              
              


            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavbarSimple;
