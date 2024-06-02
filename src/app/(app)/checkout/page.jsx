'use client';
import ProductContext from "@/context/ProductContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const { setisLoggedIn, isLoggedIn } = useContext(ProductContext);
  const [cartItem, setCartItem] = useState([]);
  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: ""
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch cart items from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItem = JSON.parse(localStorage.getItem("cartItem"));
      console.log("Fetched cart items from localStorage:", storedCartItem);
      setCartItem(storedCartItem || []);
    }
  }, []);

  const totalPrice = cartItem?.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalProducts = cartItem?.reduce((total, item) => total + 1 * item.quantity, 0);

  const userDetails = useCallback(async () => {
    try {
      const userData = await axios.get("/api/isAdmin");
      if (!isLoggedIn) {
        setLoading(false);
        setIsAuthenticated(false);
        setisLoggedIn(false);
        return router.push("/login");
      }
      setisLoggedIn(true);
      console.log("userDetails checkoutpage", userData.data.data);
      const { name, email } = userData.data.data;
      setCustomerData(prevData => ({ ...prevData, fullName: name, email: email }));
    } catch (error) {
      console.error("Error fetching user details", error);
      setIsAuthenticated(false);
      setisLoggedIn(false);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router, isLoggedIn, setisLoggedIn]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/order", { customerData, cartItem, totalPrice });
      if (response.data.success) {
        toast("Order Placed", { icon: '😊' });
        if (typeof window !== "undefined") {
          localStorage.removeItem("wishlist");
          localStorage.removeItem("cart");
          localStorage.removeItem("cartItem");
        }
        router.replace("/ordercomplete");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    userDetails();
  }, [userDetails]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return router.push("/login");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-white-400 to-dark-600 mt-20 p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="gap-8 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 lg:w-4/5 bg-white rounded-md shadow-xl border p-5">
            <div className="w-full">
              <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Place Your Order</h2>
              <form onSubmit={handleOrderSubmit} className="space-y-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    className="input input-bordered w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                    id="fullName"
                    type="text"
                    value={customerData.fullName}
                    onChange={(e) => setCustomerData({ ...customerData, fullName: e.target.value })}
                    placeholder="Full Name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="input input-bordered w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    placeholder="Email Address"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className="input input-bordered w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                    id="phone"
                    type="tel"
                    value={customerData.phoneNumber}
                    onChange={(e) => setCustomerData({ ...customerData, phoneNumber: e.target.value })}
                    placeholder="Phone Number"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                    Address
                  </label>
                  <textarea
                    className="input input-bordered w-full mt-1 p-3 border-dark border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                    id="address"
                    placeholder="Address"
                    value={customerData.address}
                    onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-3 mt-4 text-dark btn btn-dark border border-black bg-gradient-to-r from-dark-500 to-white-600 rounded-lg hover:from-dark-600 hover:to-white-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 font-semibold">
                  Place Order
                </button>
              </form>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white rounded-md shadow-xl border p-5">
            <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
            <div className="flex flex-col gap-4">
              {cartItem?.map((cart) => (
                <div key={cart.id} className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-400 pb-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={cart.image}
                      width={100}
                      height={100}
                      alt="image"
                      className="rounded-md"
                    />
                    <div>
                      <h1 className="font-semibold">{cart.name}</h1>
                      <h1>Rs: {cart.price}</h1>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">x{cart.quantity}</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mt-4">
                <span>Delivery Charges</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span>Total Products</span>
                <span className="font-semibold">{totalProducts || 0}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span>Total</span>
                <span className="font-semibold">{totalPrice || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
